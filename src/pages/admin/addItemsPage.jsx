import axios from "axios";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
	const [productKey, setProductKey] = useState("");
	const [productName, setProductName] = useState("");
	const [productPrice, setProductPrice] = useState(0);
	const [productCategory, setProductCategory] = useState("audio");
	const [priceCategory, setPriceCategory] = useState("standard");
	const [productDimensions, setProductDimensions] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [productImages, setProductImages] = useState([]);
	const navigate = useNavigate();

	const imagePreviews = useMemo(() => {
		return Array.from(productImages || []).map((file) => ({
			name: file.name,
			url: URL.createObjectURL(file),
		}));
	}, [productImages]);

	async function handleAddItem() {
		// basic validation to match backend requirements
		if(!productName || productName.trim().length === 0){
			toast.error("Product name is required");
			return;
		}
		if(productPrice === null || productPrice === undefined || String(productPrice).toString().trim() === ""){
			toast.error("Price is required");
			return;
		}
		if(isNaN(Number(productPrice)) || Number(productPrice) < 0){
			toast.error("Price must be a valid number");
			return;
		}
		if(!productDimensions || productDimensions.trim().length === 0){
			toast.error("Dimensions are required");
			return;
		}
		if(!productDescription || productDescription.trim().length === 0){
			toast.error("Description is required");
			return;
		}
		const promises = [];

		//image 4
		for (let i = 0; i < productImages.length; i++) {
			console.log(productImages[i]);
			const promise = mediaUpload(productImages[i]);
			promises.push(promise);
			// if(i ==5){
			// 	toast.error("You can only upload 25 images at a time");
			// 	break;
			// }
		}


		console.log(
			productKey,
			productName,
			productPrice,
			productCategory,
			priceCategory,
			productDimensions,
			productDescription
		);
		const token = localStorage.getItem("token");

		if (token) {
			try {
				// Promise.all(promises)
				// 	.then((result) => {
				// 		console.log(result);
				// 	})
				// 	.catch((err) => {
				// 		toast.error(err);
				// 	});

				const imageUrls = await Promise.all(promises);

				const result = await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/products`,
					{
						key: productKey,
						name: productName,
						price: Number(productPrice),
						category: productCategory,
						priceCategory: priceCategory,
						dimensions: productDimensions,
						description: productDescription,
						image : imageUrls,
					},
					{
						headers: {
							Authorization: "Bearer " + token,
						},
					}
				);
				toast.success(result.data.message);
				navigate("/admin/items");
			} catch (err) {
				toast.error(err.response.data.error);
			}
		} else {
			toast.error("You are not authorized to add items");
		}
	}

	return (
		<div className="w-full h-full flex flex-col items-center p-4">
			<h1 className="text-lg font-bold mb-4">Add Items</h1>
			<div className="w-[400px] border p-4 flex flex-col items-center gap-2 rounded-lg shadow-md">
				<input
					type="text"
					placeholder="Product Key"
					value={productKey}
					onChange={(e) => setProductKey(e.target.value)}
					className="w-full p-2 border rounded"
				/>
				<input
					type="text"
					placeholder="Product Name"
					value={productName}
					onChange={(e) => setProductName(e.target.value)}
					className="w-full p-2 border rounded"
				/>
				<input
					type="number"
					placeholder="Product Price"
					value={productPrice}
					onChange={(e) => setProductPrice(e.target.value)}
					className="w-full p-2 border rounded"
				/>
				<select
					value={productCategory}
					onChange={(e) => setProductCategory(e.target.value)}
					className="w-full p-2 border rounded"
				>
					<option value="audio">Audio</option>
					<option value="lights">Lights</option>
				</select>
				<select
					value={priceCategory}
					onChange={(e) => setPriceCategory(e.target.value)}
					className="w-full p-2 border rounded"
				>
					<option value="standard">Standard</option>
					<option value="discounted">Discounted</option>
					<option value="premium">Premium</option>
				</select>
				<input
					type="text"
					placeholder="Product Dimensions"
					value={productDimensions}
					onChange={(e) => setProductDimensions(e.target.value)}
					className="w-full p-2 border rounded"
				/>
				<input
					type="text"
					placeholder="Product Description"
					value={productDescription}
					onChange={(e) => setProductDescription(e.target.value)}
					className="w-full p-2 border rounded"
				/>
				<input
					type="file"
					multiple
					accept="image/*"
					onChange={(e) => {
						setProductImages(e.target.files);
					}}
					className="w-full p-2 border rounded"
				/>
				{imagePreviews.length > 0 && (
					<div className="w-full grid grid-cols-3 gap-2 mt-2">
						{imagePreviews.map((img, idx) => (
							<div key={idx} className="relative">
								<img src={img.url} alt={img.name} className="w-full h-24 object-cover rounded" />
								<button
									type="button"
									className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
									onClick={() => {
										const next = Array.from(productImages);
										next.splice(idx, 1);
										setProductImages(next);
									}}
								>
									Remove
								</button>
							</div>
						))}
					</div>
				)}
				<button
					onClick={handleAddItem}
					className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Add
				</button>
				<button
					onClick={() => {
						navigate("/admin/items");
					}}
					className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
				>
					Cancel
				</button>
			</div>
		</div>
	);
}