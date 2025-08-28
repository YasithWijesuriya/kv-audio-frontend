import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";
import Header from "../../components/header";

export default function ProductOverview() {
	const params = useParams();
	const key = params.key;
	const [loadingStatus, setLoadingStatus] = useState("loading");
	const [product, setProduct] = useState({});

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
			.then((res) => {
				setProduct(res.data);
				setLoadingStatus("loaded");
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
				setLoadingStatus("error");
			});
	}, []);

	const normalizeUrl = (url) => {
		if (!url || typeof url !== "string") return url;
		return url.replace(/^https?:\/\/https?:\/\//i, "https://");
	};

	const imagesForSlider = useMemo(() => {
		const input = product?.image ?? product?.images;
		let list = [];
		if (Array.isArray(input)) list = input;
		else if (typeof input === "string" && input.trim().length > 0) list = [input];
		list = list.map(normalizeUrl).filter(Boolean);
		if (list.length === 0) list = ["/logo.png"];
		return list;
	}, [product]);
	return (
		<>
			<Header />
			<div className="min-h-[calc(100vh-70px)] w-full bg-primary flex justify-center">
				{loadingStatus == "loading" && (
					<div className="w-full h-full flex justify-center items-center">
						<div className="w-[70px] h-[70px] border-b-2 border-b-accent animate-spin rounded-full"></div>
					</div>
				)}
				{loadingStatus == "loaded" && (
					<div className=" w-full h-full  flex  flex-col md:flex-row justify-center items-start md:items-stretch gap-6 p-4 md:p-8 bg-white rounded-lg shadow-sm">
						<h1 className="text-2xl my-6 md:hidden  font-bold text-accent text-center ">{product.name}</h1>
	                    <div className="w-full md:w-[49%] md:sticky md:top-4 self-start">
							<ImageSlider images={imagesForSlider} />
						</div>
						<div className="w-full md:w-[49%] p-4 md:p-6 flex flex-col items-start border border-gray-100 rounded-lg">
							<h1 className="hidden md:block text-3xl font-bold text-accent">{product.name}</h1>
							<h2 className="mt-2 text-base uppercase tracking-wide text-gray-500">{product.category}</h2>
							<p className="text-gray-700 mt-4 leading-7">{product.description}</p>
							<p className="text-2xl font-semibold mt-4 text-green-600">Rs. {Number(product.price || 0).toFixed(2)}</p>
							<div className="mt-3 text-sm text-gray-600">
								<span className="font-medium">Dimensions:</span> {product.dimensions || "—"}
							</div>
							<button
								className="mt-6 bg-accent hover:brightness-110 text-white px-6 py-3 rounded-md"
								onClick={() => {
									addToCart(product.key, 1);
									toast.success("Added to Cart");
									console.log(loadCart());
								}}
							>
								Add to Cart
							</button>
						</div>
					</div>
				)}
				{loadingStatus == "error" && (
					<div className="w-full h-full flex justify-center items-center">
						<h1 className="text-3xl font-bold text-accent">Error Occured</h1>
					</div>
				)}
			</div>
		</>
	);
}