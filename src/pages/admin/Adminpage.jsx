import { BsGraphDown } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { LuSpeaker } from "react-icons/lu";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { Link, Routes, Route } from 'react-router-dom';
import AdminItemsPage from "./adminItemPage";
import AddItemsPage from "./addItemsPage";
import UpdateItemPage from "./updateItemPage";

export default function AdminPage() {
  return (
    <div className='w-full h-screen flex'>
      <div className='w-[200px] h-full bg-gray-200'>
        <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
          <BsGraphDown />
          Dashboard
        </button>
        <Link to="/admin/bookings" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
          <PiBookmarkSimpleBold />
          Bookings
        </Link>
        <Link to="/admin/items" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
          <LuSpeaker />
          Items
        </Link>
        <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
          <FaRegUser />
          Users
        </button>

      </div>
      <div className='w-[calc(100vw-200px)] h-screen'>
        {/* මෙයද ස්තීර නැති ප්‍රදේශයක් නිසා මෙයත් Routes වලින් wrap කරගන්න ඕනෙ */}
        <Routes path="/*">
          <Route path="/orders" element={<AdminOrdersPage />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/bookings" element={<h2>Bookings</h2>} />
          <Route path="/items" element={<AdminItemsPage />} />
          <Route path="/items/add" element={<AddItemsPage />} />
          <Route path="/items/edit" element={<UpdateItemPage />} />
        </Routes>

      </div>

    </div>
  )
}