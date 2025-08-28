import { useMemo, useState } from "react";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";

export default function AdminGalleryPage(){
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("general");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const canSubmit = useMemo(()=> !!file && description.trim().length>0, [file, description]);

    async function handleSubmit(){
        if(!canSubmit) return;
        setSubmitting(true);
        setError(null);
        try{
            // upload image to storage
            const imageUrl = await mediaUpload(file, "gallery");
            // send to backend
            const token = localStorage.getItem("token");
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/gallery`, {
                imageUrl,
                description,
                category
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFile(null);
            setDescription("");
            setCategory("general");
            alert("Gallery item created");
        }catch(e){
            setError("Failed to create gallery item");
        }finally{
            setSubmitting(false);
        }
    }

    return (
        <div className="w-full h-full p-4">
            <h1 className="text-xl font-semibold">Add Gallery Item</h1>
            <div className="max-w-md mt-4 bg-white border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input type="file" accept="image/*" className="w-full border rounded p-2"
                    onChange={(e)=> setFile(e.target.files?.[0] || null)} />

                <label className="block text-sm font-medium text-gray-700 mt-3">Description</label>
                <textarea className="w-full border rounded p-2" rows={3} value={description} onChange={(e)=> setDescription(e.target.value)} />

                <label className="block text-sm font-medium text-gray-700 mt-3">Category</label>
                {/* <select className="w-full border rounded p-2" value={category} onChange={(e)=> setCategory(e.target.value)}>
                    <option value="general">General</option>
                    <option value="event">Event</option>
                    <option value="product">Product</option>
                </select> */}

                {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

                <button disabled={!canSubmit || submitting} onClick={handleSubmit}
                    className="mt-4 w-full bg-accent text-white py-2 rounded disabled:opacity-50">
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
}


