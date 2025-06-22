import { useEffect, useState } from "react";
import useAuthStore from "../../../store/authStore.js";
import { updateProfile } from "../services/userApi.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, setAuth } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        username: user.username || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateProfile(formData);
      const updatedUser = response.data;
      setAuth({ user: updatedUser });
      toast.success("Profile updated!");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed!");
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
      
      <div className="absolute inset-0  z-0"></div>

     
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
            alt="Profile Art"
            className="rounded-xl shadow-lg object-cover max-h-[400px] md:max-h-[500px] w-auto"
          />
        </div>


        <div className="md:w-1/2 w-full p-8 text-black">
          <h2 className="text-3xl font-bold mb-6 text-center">Edit Your Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-black placeholder-black/50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-black placeholder-black/50 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
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

export default EditProfile;
