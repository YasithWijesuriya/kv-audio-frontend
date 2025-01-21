import { BsGraphDown } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { LuSpeaker } from "react-icons/lu";
import { PiBookmarkSimpleBold } from "react-icons/pi";

export default function AdminPage(){
    return (
        <div className='w-full h-screen flex'>
      <div className='w-[400px] h-full bg-gray-200'>
        <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
        <BsGraphDown/>
          Dashboard 
          </button>
          <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <PiBookmarkSimpleBold/>
            Bookings
            </button>
            <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
              <LuSpeaker/>
              Items
              </button>
              <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
                <FaRegUser/>
                Users
                </button>
              
      </div>
      <div className='w-full bg-red-950'>


      </div>

    </div>
    )
}