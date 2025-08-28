import React from "react";

export default function GalleryCard({ 
  item, 
  isAdmin, 
  onDelete, 
  onView 
}) {
  const normalizeUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    return url.replace(/^https?:\/\/https?:\/\//i, "https://");
  };
  const cover = normalizeUrl(item?.imageUrl) || "/logo.png";
  return (
    <div
      className="ml-32 group relative bg-white border shadow-lg border-gray-200 rounded-xl overflow-hidden  hover:shadow-xl transition mt-20"
    >
      {/* Content */}
      <div className=" w-full min-h-auto flex flex-col">
        <p className="text-xl font-bold text-gray-800 ml-5">
          {item.description}
        </p>
        <p className="text-xs text-gray-500 mt-2 ml-5">
          {new Date(item.createdAt).toLocaleString()}
        </p>


      {/* Image */}
      <img
        src={cover}
        alt={item.description}
        className="w-full h-[500px] object-cover"
        onError={(e) => {
          e.currentTarget.src = "/logo.png";
        }}
      />

        {item.category && (
          <span className="text-xs inline-block px-2 py-0.5 bg-gray-100 border border-gray-200 rounded mt-2 text-gray-700">
            {item.category}
          </span>
        )}


      </div>

      {/* Overlay for click-to-view */}
      <div
        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors cursor-zoom-in"
        onClick={() => onView(item)}
      ></div>

      {/* Admin delete */}
      {isAdmin && (
        <button
          className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow"
          onClick={(e) => { e.stopPropagation(); onDelete(item._id); }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
