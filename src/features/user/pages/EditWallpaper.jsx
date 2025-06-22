import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editUserWallpaper } from "../../../services/wallpaperService.js";
import api from "../../../services/api.js";

const EditWallpaper = () => {
  const { wallpaperId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWallpaper = async () => {
      try {
        const res = await api.get(`/api/v1/wallpapers/getUserSingleWallpaper/${wallpaperId}`);
        const data = res.data.message;
        setFormData({
          title: data.title || "",
          category: data.category || "",
          tags: data.tags ? data.tags.join(", ") : "",
        });
      } catch (error) {
        console.error("Error fetching wallpaper:", error);
      }
    };
    fetchWallpaper();
  }, [wallpaperId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await editUserWallpaper(wallpaperId, formData);
      navigate(`/user/wallpapers/${wallpaperId}`);
    } catch (error) {
      console.error("Error updating wallpaper:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1659878997289-b9ab5a0663b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 z-0"></div>

      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden w-[95%] max-w-5xl animate-fadeIn">
         <button
  onClick={() => navigate("/profile")}
  className="absolute top-4 right-4 text-gray-800 text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-2xl bg-white/10 hover:bg-white/20 shadow-lg transition duration-300 z-20"
  aria-label="Close"
>
  &times;
</button>


        <div className="md:w-1/2 w-full p-4 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Wallpaper Image"
            className="rounded-xl shadow-lg object-cover max-h-[400px] md:max-h-[500px] w-auto"
          />
        </div>

        <div className="md:w-1/2 w-full p-8 text-black">
        
          <h2 className="text-3xl font-bold mb-6 text-center">Edit Wallpaper</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter wallpaper title"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-black placeholder-black/50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-black placeholder-black/50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Enter tags"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-black placeholder-black/50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 rounded-full text-white text-lg uppercase font-semibold transition-all duration-500 bg-[length:200%] bg-[position:left] ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#326cbe] via-[#38a7d3] to-[#3276be] hover:bg-[position:right] cursor-pointer"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditWallpaper;
