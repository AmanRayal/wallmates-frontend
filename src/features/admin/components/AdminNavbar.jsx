// src/features/admin/components/AdminNavbar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import useAdminAuthStore from "@/store/adminAuthStore";

const AdminNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // const logoutAdmin = useAdminAuthStore((state) => state.logoutAdmin);

const handleLogout = () => {
  logoutAdmin();             
  toast.success("Logged out");
  navigate("/admin-login");   
};


  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center shadow-md bg-white">
      <h1 className="text-xl font-bold text-gray-800">Admine Dashboard</h1>

      <div className="relative">
        <img
          src="https://i.pravatar.cc/300"
          alt="Admin Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg rounded-md">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-red-600 z-999 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
