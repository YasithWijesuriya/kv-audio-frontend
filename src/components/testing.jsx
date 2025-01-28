import {useState} from "react";
export default function Testing(){
    const[count,setCount] = useState(0);
    const [item,setItemName] = useState("Coconut");

   
    return(
        
        <div className = "w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-9xl text-blue-700">{count} {item}</h1>
            <button className="bg-black text-3xl text-white rounded-lg p-1" onClick={()=>{
                const newCount = count + 1
                setCount(newCount)
                       
            }
            }>
                click
                
            </button>
            <div className=" w-full flex justify-evenly items-center p-4 ">
                <button className="bg-black text-3xl text-white rounded-lg p-2" onClick={()=>{
                    setItemName("Coconut")
                }}>
                    coconut
                </button>
                <button className="bg-black text-3xl text-white rounded-lg p-2"
                onClick={()=>{
                    setItemName("Orange")
                }}>
                    Orange
                </button>
                <button className="bg-black text-3xl text-white rounded-lg p-2" 
                onClick={()=>{
                    setItemName("Apple")
                }}>
                    Apple
                </button>
                <button className="bg-black text-3xl text-white rounded-lg p-2"
                onClick={()=>{
                    setItemName("Banana")
                }}>
                    Banana
                </button>
            </div>
        </div>
    )
}