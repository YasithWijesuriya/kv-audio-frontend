import { useState, useEffect } from "react";
import api from "../utils/axios";
import { FaCartShopping } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "../components/mobileNavPanel";

export default function Header() {
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token")); 
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsAdmin(false);
      return;
    }

    api
      .get("/api/users/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data;
        setIsAdmin(user?.role === "admin");
      })
      .catch(() => setIsAdmin(false));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // React re-render
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <header className="w-full h-[70px] shadow-xl flex items-center px-4 bg-slate-300 text-black font-semibold">
      {/* Logo - Left Side */}
      <div className="flex-shrink-0">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[60px] h-[60px] object-cover rounded-full border-2 border-white shadow-md"
        />
      </div>

      {/* Navigation Links - Center */}
      <nav className="hidden md:flex flex-1 justify-center items-center space-x-8">
        <Link to="/" className="text-[20px] hover:text-blue-600 transition-colors">
          Home
        </Link>
        <Link to="/items" className="text-[20px] hover:text-blue-600 transition-colors">
          Items
        </Link>
        <Link to="/gallery" className="text-[20px] hover:text-blue-600 transition-colors">
          Gallery
        </Link>
        <Link to="/about" className="text-[20px] hover:text-blue-600 transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-[20px] hover:text-blue-600 transition-colors">
          Contact
        </Link>
        {isAdmin && (
          <Link
            to="/admin/"
            className="text-[20px] font-bold text-red-700 hover:text-red-800 transition-colors"
          >
            Admin
          </Link>
        )}
      </nav>

      {/* Right Side Actions */}
      <div className="hidden md:flex items-center space-x-4 ml-auto">
        {/* Cart Icon */}
        <Link
          to="/booking"
          className="relative p-3 text-[22px] text-gray-700 hover:text-blue-600 transition-colors"
          title="View Bookings"
        >
          <FaCartShopping />
        </Link>

        {/* Logout Button */}
        {token && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        )}

        {/* Login / Register Buttons if no token */}
        {!token && (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <GiHamburgerMenu
        className="md:hidden text-[24px] ml-auto cursor-pointer hover:text-blue-600 transition-colors"
        onClick={() => setNavPanelOpen(true)}
      />

      {/* Mobile Navigation Panel */}
      <MobileNavPanel
        isOpen={navPanelOpen}
        setOpen={setNavPanelOpen}
        token={token}
        isAdmin={isAdmin}
        handleLogout={handleLogout}
      />
    </header>
  );
}
