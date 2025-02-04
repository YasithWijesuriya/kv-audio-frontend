const sampleArr = [
    {
        key: "P001",
        name: "Wireless Headphones",
        price: 99.99,
        category: "audio",
        dimensions: "20x15x5 cm",
        description: "High-quality wireless headphones with noise cancellation.",
        availability: true,
        image: ["https://example.com/headphones.jpg"]
    },
    {
        key: "P002",
        name: "Bluetooth Speaker",
        price: 49.99,
        category: "audio",
        dimensions: "10x10x10 cm",
        description: "Portable Bluetooth speaker with deep bass and long battery life.",
        availability: true,
        image: ["https://example.com/speaker.jpg"]
    },
    {
        key: "P003",
        name: "Smart LED Lights",
        price: 29.99,
        category: "lights",
        dimensions: "5x5x10 cm",
        description: "Smart LED lights with customizable colors and voice control.",
        availability: true,
        image: ["https://example.com/lights.jpg"]
    },
    {
        key: "P004",
        name: "Gaming Mouse",
        price: 39.99,
        category: "accessories",
        dimensions: "12x7x4 cm",
        description: "Ergonomic gaming mouse with customizable DPI and RGB lighting.",
        availability: true,
        image: ["https://example.com/mouse.jpg"]
    },
    {
        key: "P005",
        name: "Mechanical Keyboard",
        price: 79.99,
        category: "accessories",
        dimensions: "45x15x5 cm",
        description: "High-quality mechanical keyboard with customizable RGB lighting.",
        availability: true,
        image: ["https://example.com/keyboard.jpg"]
    }
];
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
export default function AdminItemsPage(){
    const [items,setItems] = useState(sampleArr)
    
    return(
        <div className="w-full h-full relative">
            <table>
                <thead>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Availability</th>
                </thead>
                <tbody>
                    {
                        items.map((product)=>{
                            console.log(product)
                            return (
                                <tr key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.availability ? "Available" : "Not Available"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Link to="/admin/items/add">
                <CiCirclePlus className="text-[70px] absolute right-2 bottom-2 hover:text-red-900 " />
            </Link>
        </div>
    )
}