import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cart";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";

export default function BookingItem({ itemKey, qty, refresh }) {
	const [item, setItem] = useState(null);
	const [status, setStatus] = useState("loading"); // loading, success, error

	const normalizeUrl = (url) => {
		if (!url || typeof url !== "string") return url;
		return url.replace(/^https?:\/\/https?:\/\//i, "https://");
	};

	const cover = useMemo(() => {
		if (!item) return "/logo.png";
		const images = item?.image ?? item?.images;
		let url = "/logo.png";
		if (Array.isArray(images) && images.length > 0) url = images[0];
		else if (typeof images === "string" && images.trim().length > 0) url = images;
		return normalizeUrl(url) || "/logo.png";
	}, [item]);

	useEffect(() => {
		if (status === "loading") {
			axios
				.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`)
				.then((res) => {
					setItem(res.data);
					setStatus("success");
				})
				.catch((err) => {
					console.error(err);
					setStatus("error");
					removeFromCart(itemKey);
					refresh();
				});
		}
	}, [status]);

	if (status === "loading") {
		return <div className="text-accent">Loading...</div>;
	}

	if (status === "error") {
		return <div className="text-red-500">Failed to load product.</div>;
	}

	return (
		<div className="flex w-[600px] my-2 items-center gap-4 p-4 bg-white shadow-sm rounded-lg border border-gray-200 relative">
            <div className="absolute right-[-45px]  text-red-500 hover:text-white hover:bg-red-500 p-[10px] rounded-full  cursor-pointer">
            <FaTrash onClick={() => {
                removeFromCart(itemKey);
                refresh();
            }
            }/>
            </div>
			{/* Product Image */}
			<img
				src={cover}
				alt={item.name}
				className="w-20 h-20 object-cover rounded-lg border border-gray-200"
				onError={(e)=>{ e.currentTarget.src = "/logo.png"; }}
			/>

			{/* Product Details */}
			<div className="flex flex-row items-center relative  w-full">
				<h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
				<div className="flex absolute right-0 gap-4">
					<p className="font-medium w-[70px] text-center text-gray-700">
						{Number(item.price || 0).toFixed(2)}
					</p>
					<p className=" font-medium w-[40px] text-center relative flex justify-center items-center">
						<button
							className="absolute top-[-20px] hover:text-accent"
							onClick={() => {
								addToCart(itemKey, 1);
								refresh();
							}}
						>
							<FaArrowUp />
						</button>
						{qty}
						<button
							className="absolute bottom-[-20px] hover:text-accent"
							onClick={() => {
								if (qty == 1) {
									removeFromCart(itemKey);
									refresh();
								} else {
									addToCart(itemKey, -1);
									refresh();
								}
							}}
						>
							<FaArrowDown />
						</button>
					</p>
					<p className="text-lg font-semibold text-green-600">
						{Number(item.price || 0 * qty).toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
}