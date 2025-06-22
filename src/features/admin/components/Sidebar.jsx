import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r shadow-lg min-h-screen px-4 py-6 space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      <nav className="flex flex-col space-y-3 text-gray-700">
        <NavLink to="home" className="hover:text-black">🏠 Dashboard Home</NavLink>
        <NavLink to="pending" className="hover:text-black">🕓 Pending Wallpapers</NavLink>
        <NavLink to="approved" className="hover:text-black">✅ Approved Wallpapers</NavLink>
        <NavLink to="upload" className="hover:text-black">📤 Upload Wallpaper</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
