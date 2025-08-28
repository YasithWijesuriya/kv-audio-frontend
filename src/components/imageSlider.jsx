import { useEffect, useMemo, useState } from "react";

export default function ImageSlider(props){
    const normalizeUrl = (url) => {
        if (!url || typeof url !== "string") return url;
        return url.replace(/^https?:\/\/https?:\/\//i, "https://");
    };

    const resolvedImages = useMemo(() => {
        const input = props.images;
        let list = [];
        if (Array.isArray(input)) list = input;
        else if (typeof input === "string" && input.trim().length > 0) list = [input];
        list = list.map(normalizeUrl).filter(Boolean);
        if (list.length === 0) list = ["/logo.png"];
        return list;
    }, [props.images]);

    const [selectedImage, setSelectedImage] = useState(resolvedImages[0]);

    useEffect(() => {
        setSelectedImage(resolvedImages[0]);
    }, [resolvedImages]);

    return(
        <div className="w-full flex flex-col items-center ">
            <img src={selectedImage} alt="product" className="w-full h-[300px] md:h-[500px] object-cover" onError={(e)=>{ e.currentTarget.src = "/logo.png"; }} />
            <div className="w-full mt-[20px] h-[90px] flex justify-center items-center">
                {
                    resolvedImages.map((image,index)=>{
                        return <img key={index} src={image} alt="product" className={`w-[70px] h-[70px] mr-[2px] object-cover cursor-pointer ${image == selectedImage && "border border-accent"}`} onClick={
                            ()=>{
                                setSelectedImage(image);
                            }
                        } onError={(e)=>{ e.currentTarget.src = "/logo.png"; }}/>
                    })
                }
            </div>

        </div>
    )
}