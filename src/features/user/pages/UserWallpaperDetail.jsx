import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../services/api.js";
import { deleteUserWallpaper } from "../../../services/wallpaperService.js";

const UserWallpaperDetail = () => {
  const { wallpaperId } = useParams();
  const navigate = useNavigate();
  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallpaper = async () => {
      try {
        const res = await api.get(`api/v1/wallpapers/getUserSingleWallpaper/${wallpaperId}`);
        setWallpaper(res.data.message);
      } catch (err) {
        console.error("Error fetching wallpaper:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallpaper();
  }, [wallpaperId]);

  const handleEdit = () => {
    navigate(`/edit-wallpaper/${wallpaperId}`);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this wallpaper?")) return;

    try {
      await deleteUserWallpaper(wallpaper._id);
      alert("Wallpaper deleted successfully!");
      navigate("/profile");
    } catch (err) {
      alert(err?.message || "Failed to delete wallpaper.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!wallpaper) return <p className="text-center mt-10 text-red-400">Wallpaper not found.</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1711861982569-565113102217?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    > 
      <div className="max-w-4xl w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
      <button
  onClick={() => navigate("/profile")}
  className="absolute top-4 right-4 text-gray-800 text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-2xl bg-white/10 hover:bg-white/20 shadow-lg transition duration-300 z-20"
  aria-label="Close"
>
  &times;
</button>
        <h1 className="text-3xl font-bold mb-4">{wallpaper.title}</h1>

        <img
          src={wallpaper.urls[0]}
          alt={wallpaper.title}
          className="w-full h-72 object-cover rounded-lg mb-6 shadow-md"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><span className="font-semibold">Description:</span> {wallpaper.description || "N/A"}</p>
          <p><span className="font-semibold">Resolution:</span> {wallpaper.resolution}</p>
          <p><span className="font-semibold">Size:</span> {(wallpaper.size / (1024 * 1024)).toFixed(2)} MB</p>
          <p><span className="font-semibold">Tags:</span> {wallpaper.tags.join(", ")}</p>
          <p><span className="font-semibold">Category:</span> {wallpaper.category}</p>
          <p><span className="font-semibold">Status:</span> {wallpaper.status}</p>
          <p><span className="font-semibold">Likes:</span> {wallpaper.likes}</p>
          <p><span className="font-semibold">Downloads:</span> {wallpaper.downloads}</p>
          {/* <p><span className="font-semibold">Views:</span> {wallpaper.views}</p> */}
          <p><span className="font-semibold">Uploaded At:</span> {new Date(wallpaper.createdAt).toLocaleString()}</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleEdit}
            className={`w-full h-12 rounded-full text-white text-lg uppercase font-semibold transition-all duration-500 bg-[length:200%] bg-[position:left] ${
    loading
      ? "bg-blue-500 cursor-not-allowed"
      : "bg-gradient-to-r from-[#326cbe] via-[#38a7d3] to-[#3276be] hover:bg-[position:right] cursor-pointer"
  }`}
          >
            Edit Wallpaper
          </button>
          <button
            onClick={handleDelete}
            className={`w-full h-12 rounded-full text-white text-lg uppercase font-semibold transition-all duration-500 bg-[length:200%] bg-[position:left] ${
    loading
      ? "bg-blue-500 cursor-not-allowed"
      : "bg-gradient-to-r from-[#326cbe] via-[#38a7d3] to-[#3276be] hover:bg-[position:right] cursor-pointer"
  }`}
          >
            Delete Wallpaper
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserWallpaperDetail;
