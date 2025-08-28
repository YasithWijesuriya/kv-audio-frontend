import { BsGraphDown, BsBox, BsPeople, BsCalendarCheck, BsImage, BsPlusCircle, BsGear } from "react-icons/bs";
import { FaRegBookmark, FaRegUser, FaSignOutAlt, FaHome, FaChartLine, FaDollarSign } from "react-icons/fa";
import { MdOutlineSpeaker, MdOutlineDashboard } from "react-icons/md";
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import AdminItemsPage from "./adminItemPage";
import AddItemPage from "./addItemsPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import AdminGalleryPage from "./adminGalleryPage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage(){
  const [userValidated, setUserValidated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalItems: 0,
    totalRevenue: 0
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      window.location.href = "/login";
    }
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res.data);
      const user = res.data;
      if(user.role == "admin"){
        setUserValidated(true);
        setUserData(user);
        // Fetch dashboard stats here
        fetchDashboardStats();
      }else{
        window.location.href = "/";
      }
      
    }).catch((err)=>{
      console.error(err);
      setUserValidated(false);
    })
  },[])

  const fetchDashboardStats = async () => {
    try {
      // Mock data for now - replace with actual API calls
      setStats({
        totalUsers: 1247,
        totalOrders: 89,
        totalItems: 156,
        totalRevenue: 45678
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActiveRoute = (path) => {
    return location.pathname.includes(path);
  };

  if (!userValidated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating admin access...</p>
        </div>
      </div>
    );
  }

  return(
    <div className="w-full h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 h-full bg-white shadow-lg">
        {/* Header */}
        <div className="h-20 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-xl font-bold">KV Audio</h1>
            <p className="text-sm opacity-90">Admin Dashboard</p>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {userData?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{userData?.name || 'Admin User'}</p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <Link 
            to="/admin" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
              location.pathname === "/admin" 
                ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700" 
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <MdOutlineDashboard className="text-xl" />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link 
            to="/admin/orders" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
              isActiveRoute("/orders") 
                ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700" 
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FaRegBookmark className="text-xl" />
            <span className="font-medium">Orders</span>
          </Link>

          <Link 
            to="/admin/items" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
              isActiveRoute("/items") 
                ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700" 
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <MdOutlineSpeaker className="text-xl" />
            <span className="font-medium">Items</span>
          </Link>

          <Link 
            to="/admin/users" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
              isActiveRoute("/users") 
                ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700" 
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FaRegUser className="text-xl" />
            <span className="font-medium">Users</span>
          </Link>

          <Link 
            to="/admin/gallery" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
              isActiveRoute("/gallery") 
                ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700" 
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <BsImage className="text-xl" />
            <span className="font-medium">Gallery</span>
          </Link>
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <Link 
            to="/" 
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 mb-2"
          >
            <FaHome className="text-xl" />
            <span className="font-medium">Back to Site</span>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {userValidated && (
          <Routes path="/*">
            <Route path="/" element={<DashboardHome stats={stats} />} />
            <Route path="/orders" element={<AdminOrdersPage/>}/>
            <Route path="/users" element={<AdminUsersPage/>}/>
            <Route path="/items" element={<AdminItemsPage/>}/> 
            <Route path="/items/add" element={<AddItemPage/>}/>
            <Route path="/items/edit" element={<UpdateItemPage/>}/>
            <Route path="/gallery" element={<AdminGalleryPage/>}/>
          </Routes>
        )}
      </div>
    </div>
  )
}

// Dashboard Home Component
function DashboardHome({ stats }) {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Admin!</h1>
        <p className="text-gray-600">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BsPeople className="text-blue-600 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+12%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BsCalendarCheck className="text-green-600 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+8%</span>
            <span className="text-gray-500 ml-2">from last week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BsBox className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+5%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">Rs{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaDollarSign className="text-orange-600 text-xl" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+15%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BsPlusCircle className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Add New Item</h3>
              <p className="text-sm text-gray-500">Create a new product listing</p>
            </div>
          </div>
          <Link 
            to="/admin/items/add"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Item
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BsImage className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Gallery</h3>
              <p className="text-sm text-gray-500">Update product images</p>
            </div>
          </div>
          <Link 
            to="/admin/gallery"
            className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Manage Gallery
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaRegUser className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">View Users</h3>
              <p className="text-sm text-gray-500">Monitor user accounts</p>
            </div>
          </div>
          <Link 
            to="/admin/users"
            className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            View Users
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <BsPlusCircle className="text-blue-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">New item added</p>
              <p className="text-xs text-gray-500">Professional Microphone - 2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FaRegBookmark className="text-green-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">New order received</p>
              <p className="text-xs text-gray-500">Order #1234 - 4 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <FaRegUser className="text-purple-600 text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">New user registered</p>
              <p className="text-xs text-gray-500">john.doe@email.com - 6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}