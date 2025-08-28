import axios from "axios";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function UpdateItemPage() {
	const location = useLocation();

	console.log(location);

	const [productKey, setProductKey] = useState(location.state.key);
	const [productName, setProductName] = useState(location.state.name);
	const [productPrice, setProductPrice] = useState(location.state.price);
	const [productCategory, setProductCategory] = useState(
		location.state.category
	);
	const [priceCategory, setPriceCategory] = useState(location.state.priceCategory || "standard");
	const [productDimensions, setProductDimensions] = useState(
		location.state.dimensions
	);
	const [productDescription, setProductDescription] = useState(
		location.state.description
	);
	const [productImages, setProductImages] = useState([]);
	const [existingImages, setExistingImages] = useState(location.state.image || []);
	const navigate = useNavigate();

	const existingPreviews = useMemo(() => (Array.isArray(existingImages) ? existingImages : (existingImages ? [existingImages] : [])), [existingImages]);
	const newPreviews = useMemo(() => Array.from(productImages || []).map(f => ({ name: f.name, url: URL.createObjectURL(f) })), [productImages]);

	async function handleUpdateItem() {

		let updatingImages = existingPreviews.slice();

		if (productImages.length > 0) {
			const promises = [];

			//image 4
			for (let i = 0; i < productImages.length; i++) {
				console.log(productImages[i]);
				const promise = mediaUpload(productImages[i]);
				promises.push(promise);
				
			}

			const uploaded = await Promise.all(promises);
			updatingImages = existingPreviews.concat(uploaded);

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
				const result = await axios.put(
					`${import.meta.env.VITE_BACKEND_URL}/api/products/${productKey}`,
					{
						name: productName,
						price: productPrice,
						category: productCategory,
						priceCategory: priceCategory,
						dimensions: productDimensions,
						description: productDescription,
						image : updatingImages
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
			<h1 className="text-lg font-bold mb-4">Update Item</h1>
			<div className="w-[400px] border p-4 flex flex-col items-center gap-2 rounded-lg shadow-md">
				<input
					disabled
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
				<textarea
					type="text"
					placeholder="Product Description"
					value={productDescription}
					onChange={(e) => setProductDescription(e.target.value)}
					className="w-full p-2 border rounded"
				/>
				<div className="w-full">
					<p className="text-sm text-gray-700 mb-1">Existing Images</p>
					<div className="grid grid-cols-3 gap-2 mb-3">
						{existingPreviews.map((url, idx)=> (
							<div key={idx} className="relative">
								<img src={url} alt="existing" className="w-full h-24 object-cover rounded" />
								<button
									type="button"
									className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
									onClick={()=>{
										const next = existingPreviews.slice();
										next.splice(idx,1);
										setExistingImages(next);
									}}
								>
									Remove
								</button>
							</div>
						))}
					</div>
					<p className="text-sm text-gray-700 mb-1">Add New Images</p>
					<input
						type="file"
						multiple
						accept="image/*"
						onChange={(e) => {
							setProductImages(e.target.files);
						}}
						className="w-full p-2 border rounded"
					/>
					{newPreviews.length > 0 && (
						<div className="grid grid-cols-3 gap-2 mt-2">
							{newPreviews.map((img, idx)=> (
								<div key={idx} className="relative">
									<img src={img.url} alt={img.name} className="w-full h-24 object-cover rounded" />
									<button
										type="button"
										className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
										onClick={()=>{
											const next = Array.from(productImages);
											next.splice(idx,1);
											setProductImages(next);
										}}
									>
										Remove
										</button>
								</div>
							))}
						</div>
					)}
				</div>
				<button
					onClick={handleUpdateItem}
					className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Update Item
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