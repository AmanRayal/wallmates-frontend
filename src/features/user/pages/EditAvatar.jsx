import { useState } from "react";
import { toast } from "react-toastify";
import useAuthStore from "../../../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditAvatar = () => {
  const { user, setAuth } = useAuthStore();
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(""); // Display file name before uploading
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setFileName(file.name); // Display the file name
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatarFile) return toast.error("Please select an avatar image");

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      setLoading(true);
      const res = await axios.put(
        "https://wallmates-backend.onrender.com/api/v1/users/updateAvatar",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Avatar updated successfully!");
      navigate("/profile");

      setAuth({ user: res.data.data }); // Update global user with new avatar
      setFileName(""); // Reset the file name
      setAvatarFile(null); // Reset the file
    } catch (error) {
      toast.error(error.response?.data?.message || "Avatar update failed");
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

      {/* Glass container */}
      <div className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden w-[95%] max-w-5xl animate-fadeIn">

        {/* Close button */}
        <button
          onClick={() => navigate("/profile")}
          className="absolute top-4 right-4 text-gray-700 text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-2xl bg-white/10 hover:bg-white/20 shadow-lg transition duration-300 z-20"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="md:w-1/2 w-full p-4 flex items-center justify-center">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Current Avatar"
              className="rounded-lg shadow-lg object-cover max-h-[400px] md:max-h-[500px] w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-500 flex items-center justify-center text-black text-2xl">
              No Avatar
            </div>
          )}
        </div>

     
        <div className="md:w-1/2 w-full p-8 text-black">
          <h2 className="text-3xl font-bold mb-6 text-center text-black">Update Avatar</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Select New Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 rounded-lg bg-white/30 border border-white/20 text-gray-700 placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {fileName && <p className="text-white mt-2">{fileName}</p>}
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
              {loading ? "Uploading..." : "Update Avatar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAvatar;
