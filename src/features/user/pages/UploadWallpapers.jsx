import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadWallpaper = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      return toast.error("Please select at least one wallpaper image.");
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("tags", formData.tags);

    // Append multiple wallpaper images
    files.forEach((file) => {
      data.append("wallpaper", file);
    });

    try {
      setLoading(true);
const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/v1/wallpapers/uploadWallpapers`,
  data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Wallpapers uploaded successfully!");
      navigate("/profile");
      setFormData({ title: "", description: "", category: "", tags: "" });
      setFiles([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1659878997289-b9ab5a0663b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
    
      <div className="absolute inset-0 z-0"></div>

  
      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl flex flex-col md:flex-row w-[95%] max-w-5xl p-8 animate-fadeIn">
        <button
          onClick={() => navigate("/profile")}
          className="absolute top-4 right-4 text-gray-800 text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-2xl bg-white/10 hover:bg-white/20 shadow-lg transition duration-300 z-20"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="md:w-1/2 w-full p-4 flex items-center justify-center group">
          <img
            src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Wallpaper Art"
            className="rounded-xl shadow-lg object-cover max-h-[400px] md:max-h-[500px] w-auto "
          />
        </div>


        <div className="md:w-1/2 w-full p-8 text-black">
          <h2 className="text-3xl font-bold mb-6 text-center text-black">Upload Wallpapers</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Description (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Tags (comma separated)</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Enter tags"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-gray-800 placeholder-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">Upload Wallpaper Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-gray-800 placeholder-gray-600 focus:outline-none"
                required
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
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>

          {/* Image preview */}
          {files.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-2">
              {files.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadWallpaper;
