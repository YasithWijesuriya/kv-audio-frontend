import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import GalleryCard from "../../components/GalleryCard";
import Header from "../../components/header";

export default function GalleryPage(){
    const token = localStorage.getItem("token");
    const [isAdmin, setIsAdmin] = useState(false);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewer, setViewer] = useState({ open:false, imageUrl:"", description:"", createdAt:null, category:""});

    useEffect(()=>{
        if(!token){ setIsAdmin(false); return; }
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            setIsAdmin(res.data?.role === 'admin');
        }).catch(()=> setIsAdmin(false));
    }, [token]);

    function fetchPage(p){
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gallery?page=${p}&limit=${limit}`)
            .then((res)=>{
                setItems(res.data.data || []);
                setTotalPages(res.data.pagination?.totalPages || 1);
                setPage(res.data.pagination?.page || p);
                setError(null);
            })
            .catch(()=>{ setError("Failed to load gallery"); })
            .finally(()=> setLoading(false));
    }

    useEffect(()=>{ fetchPage(1); }, []);

    const normalizeUrl = (url) => {
        if (!url || typeof url !== "string") return url;
        return url.replace(/^https?:\/\/https?:\/\//i, "https://");
    };

    const normalizedItems = useMemo(()=> items.map(it=>({
        ...it,
        imageUrl: normalizeUrl(it.imageUrl)
    })), [items]);

    async function handleDelete(id){
        if(!isAdmin) return;
        try{
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPage(page);
        }catch(e){ /* ignore */ }
    }

    return (
        <>
            <Header />
            <div className="min-h-[calc(100vh-70px)] w-full bg-gray-50">
                <div className="w-[90%] min-h-auto h-fit bg-gray-50 p-4 md:p-8 grid grid-cols-1 mx-auto">
                    <div className="w-full max-w-6xl flex items-center justify-between">
                        <div className="ml-10 mt-10">
                            <h1 className="text-5xl font-bold text-gray-900">Gallery Section</h1>
                            <p className="text-gray-600  text-xl mt-0.5">Browse our latest shots.</p>
                        </div>
                    </div>

                    {loading && (
                        <div className="w-full max-w-6xl flex justify-center items-center h-40">
                            <div className="w-[70px] h-[70px] border-b-2 border-b-accent animate-spin rounded-full"></div>
                        </div>
                    )}
                    {error && (
                        <div className="text-red-600 mt-6">{error}</div>
                    )}

                    {!loading && !error && (
                        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 mt-8 ">
                          {normalizedItems.map((g) => (
                            <GalleryCard
                              key={g._id}
                              item={g}
                              isAdmin={isAdmin}
                              onDelete={handleDelete}
                              onView={(item) =>
                                setViewer({
                                  open: true,
                                  imageUrl: item.imageUrl,
                                  description: item.description,
                                  createdAt: item.createdAt,
                                  category: item.category,
                                })
                              }
                            />
                          ))}
                        </div>
                    )}

                    {!loading && totalPages > 1 && (
                        <div className="mt-6 flex gap-2">
                            <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page<=1} onClick={()=> fetchPage(page-1)}>Prev</button>
                            <span className="px-3 py-1">Page {page} of {totalPages}</span>
                            <button className="px-3 py-1 border rounded disabled:opacity-50" disabled={page>=totalPages} onClick={()=> fetchPage(page+1)}>Next</button>
                        </div>
                    )}

                    {viewer.open && (
                        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={()=> setViewer({ open:false, imageUrl:"", description:"", createdAt:null, category:"" })}>
                            <div className="w-full flex flex-col items-center" onClick={(e)=> e.stopPropagation()}>
                                <div className="w-full flex justify-end mb-2">
                                    <button className="text-white text-xl" onClick={()=> setViewer({ open:false, imageUrl:"", description:"", createdAt:null, category:"" })}>✕</button>
                                </div>
                                <div className="relative bg-black rounded-md overflow-hidden" style={{ width: '80vw', maxWidth: '80vw' }}>
                                    <img src={viewer.imageUrl} alt={viewer.description}
                                         style={{ width: '80vw', maxWidth: '80vw', height: 'auto', maxHeight: '80vh', objectFit: 'contain', display: 'block' }} />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white pointer-events-none">
                                        <div className="text-base md:text-lg">{viewer.description}</div>
                                        <div className="text-xs md:text-sm opacity-80">{viewer.createdAt ? new Date(viewer.createdAt).toLocaleString() : ''}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
