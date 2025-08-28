import { Link } from "react-router-dom";
import { FaEye, FaStar, FaTruck } from "react-icons/fa";

export default function ProductCard({ item }) {
  const resolveImage = (product) => {
    if (Array.isArray(product?.image) && product.image.length > 0) return product.image[0];
    if (typeof product?.image === "string" && product.image.trim().length > 0) return product.image;
    if (Array.isArray(product?.images) && product.images.length > 0) return product.images[0];
    return "/logo.png";
  };

  const normalizeUrl = (url) => {
    if (!url) return url;
    return url.replace(/^https?:\/\/https?:\/\//i, "https://");
  };

  const cover = normalizeUrl(resolveImage(item));

  const formatPrice = (price) => {
    if (typeof price === "number") return `Rs ${price.toFixed(2)}`;
    if (typeof price === "string" && price.includes("$")) return price;
    return `$${price}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={cover}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Availability Badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
            item.availability ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {item.availability ? "In Stock" : "Out of Stock"}
        </span>

        {/* Category Badge */}
        {item.category && (
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white shadow-md">
            {item.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {item.description || "No description available"}
        </p>

        {/* Price + Rating */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(item.price)}
            </span>
            {item.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(item.oldPrice)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(item.rating || 4.5)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">
              {item.rating || "4.5"}
            </span>
          </div>
        </div>

        {/* Free Shipping */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FaTruck className="w-4 h-4 mr-2 text-gray-400" />
          <span>Free Shipping</span>
        </div>

        {/* Action */}
        <Link
          to={`/product/${item.key}`}
          className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 group-hover:shadow-lg"
        >
          <div className="flex justify-center items-center space-x-2">
            <FaEye className="w-4 h-4" />
            <span>View Details</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
