import React, { useState } from 'react';

export default function AddItemsPage() {
    const [productKey, setProductKey] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("audio");
    const [productDimensions, setProductDimensions] = useState("");
    const [productDescription, setProductDescription] = useState("");

    return (
        <div className="h-full w-full flex flex-col items-center">
            <h1>Add Items</h1>
            <div className="w-[400px] border flex flex-col items-center">
                <input 
                    onChange={(e) => setProductKey(e.target.value)} 
                    type="text" 
                    placeholder="Product Key" 
                    value={productKey}
                />
                <input 
                    onChange={(e) => setProductName(e.target.value)} 
                    type="text" 
                    placeholder="Product Name" 
                    value={productName}
                />
                <input 
                    onChange={(e) => setProductPrice(e.target.value)} 
                    type="text" 
                    placeholder="Product Price" 
                    value={productPrice}
                />
                <select 
                    onChange={(e) => setProductCategory(e.target.value)} 
                    value={productCategory}
                >
                    <option value="audio">Audio</option>
                    <option value="Lights">Lights</option>
                </select>
                <input 
                    onChange={(e) => setProductDimensions(e.target.value)} 
                    type="text" 
                    placeholder="Product Dimensions" 
                    value={productDimensions}
                />
                <input 
                    onChange={(e) => setProductDescription(e.target.value)} 
                    type="text" 
                    placeholder="Product Description" 
                    value={productDescription}
                />
                
                <button>Add</button>
            </div>
        </div>
    );
}