import AdminNavbar from "../components/AdminNavbar";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const dashboardCards = [
    {
      title: "Admin Wallpapers",
      description: "Total wallpapers uploaded by admin",
    },
    {
      title: "Pending Wallpapers",
      description: "Wallpapers waiting for approval",
      path: "/admin-dashboard/pending",
    },
    {
      title: "Upload Wallpaper",
      description: "Add new wallpaper as admin",
      path: "/admin-dashboard/upload",
    },
  ];

  return (
    <div>
      <AdminNavbar />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <Link to={card.path} key={index}>
            <div className="p-5 bg-white shadow-md rounded-2xl hover:shadow-xl transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-600 mb-4">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
