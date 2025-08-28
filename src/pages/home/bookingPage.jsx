import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage(){
    const [cart, setCart] = useState(loadCart());
    const [startingDate, setStartingDate] = useState(formatDate(new Date()));
    const [endingDate, setEndingDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)));
    const [total , setTotal] = useState(0);
    const daysBetween = Math.max((new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24), 1);

    function reloadCart(){
        setCart(loadCart());
        calculateTotal();
        
    }
    function calculateTotal(){
        const cartInfo = loadCart();
        cartInfo.startingDate = startingDate;
        cartInfo.endingDate = endingDate;
        cartInfo.days = daysBetween;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,
            cartInfo
        ).then((res)=>{
            console.log(res.data)
            setTotal(res.data.total);
        }).catch((err)=>{   
            console.error(err);
        })
    }

    useEffect(()=>{
        calculateTotal();
    },[startingDate, endingDate])
    
    function handleBookingCreation(){
        const cart = loadCart();
        cart.startingDate = startingDate;
        cart.endingDate = endingDate;
        cart.days = daysBetween;

        const token = localStorage.getItem("token");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res.data);
            localStorage.removeItem("cart");
            toast.success("Booking Created");
            setCart(loadCart());
        }).catch((err)=>{
            console.error(err);
            toast.error("Failed to create booking");
        })
    }

    return(
        <div className="w-full min-h-full flex flex-col items-center bg-gray-50 p-4 md:p-8">
            <div className="w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-900">Create Booking</h1>
                <p className="text-gray-600 mt-1">Choose your dates and review your items below.</p>
            </div>
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col">
                            <span className="text-gray-700 font-medium">Starting Date</span>
                            <input 
                                type="date" 
                                value={startingDate} 
                                onChange={(e) => setStartingDate(e.target.value)} 
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent" 
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="text-gray-700 font-medium">Ending Date</span>
                            <input 
                                type="date" 
                                value={endingDate} 
                                onChange={(e) => setEndingDate(e.target.value)} 
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent" 
                            />
                        </label>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">Total Days: <span className="font-semibold text-gray-800">{daysBetween}</span></p>
                    <div className="w-full flex flex-col items-center mt-4">
                        {
                            cart.orderedItems.map((item)=>{
                                return <BookingItem itemKey={item.key} key={item.key} qty={item.qty} refresh={reloadCart}/>
                            })
                        }
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-fit md:sticky md:top-6">
                    <h2 className="text-lg font-semibold text-gray-900">Summary</h2>
                    <div className="flex justify-between mt-3 text-gray-700">
                        <span>Items</span>
                        <span>{cart.orderedItems.length}</span>
                    </div>
                    <div className="flex justify-between mt-2 text-gray-700">
                        <span>Total Days</span>
                        <span>{daysBetween}</span>
                    </div>
                    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-xl font-semibold">
                        <span>Total</span>
                        <span className="text-green-600">{total.toFixed(2)}</span>
                    </div>
                    <button className="w-full mt-4 bg-accent hover:brightness-110 text-white px-4 py-2 rounded-md" onClick={handleBookingCreation}>Create Booking</button>
                </div>
            </div>
        </div>
    )
}