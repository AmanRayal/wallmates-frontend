import useAuthStore from "../../../store/authStore.js";
import { Link , useNavigate } from "react-router-dom";
import UploadedWallpaper from "./UploadedWallpapers.jsx";

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  const defaultAvatar =
    "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png";

    const navigate = useNavigate();

   return (
    <div className="min-h-screen flex flex-col justify-center" style={{ backgroundColor: 'rgb(17,20,23)' }}>
      <button
  onClick={() => navigate("/")}
  className="absolute top-4 right-4 text-white text-2xl font-bold rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-2xl bg-white/10 hover:bg-white/20 shadow-lg transition duration-300 z-20"
  aria-label="Close"
>
  &times;
</button>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Profile</h1>

        {/* Profile Info */}
        <div className="flex items-center space-x-6 mb-12">
          <img
            src={user?.avatar || defaultAvatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
          <div className="text-white">
            <h2 className="text-2xl font-semibold mb-1">{user?.fullName}</h2>
            <p className="text-sm text-gray-400 mb-1">@{user?.username}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <Link
            to="/edit-profile"
            className="block bg-blue-600 text-white text-center px-6 py-3 rounded-lg shadow-md transition-all transform hover:scale-101 hover:bg-blue-700 focus:outline-none"
          >
            Edit Profile
          </Link>
          <Link
            to="/change-password"
            className="block bg-gray-700 text-white text-center px-6 py-3 rounded-lg shadow-md transition-all transform hover:scale-101 hover:bg-gray-800 focus:outline-none"
          >
            Change Password
          </Link>
          <Link
            to="/update-avatar"
            className="block bg-green-600 text-white text-center px-6 py-3 rounded-lg shadow-md transition-all transform hover:scale-101 hover:bg-green-700 focus:outline-none"
          >
            Update Avatar
          </Link>
          <Link
            to="/upload-wallpaper"
            className="block bg-indigo-600 text-white text-center px-6 py-3 rounded-lg shadow-md transition-all transform hover:scale-101 hover:bg-indigo-700 focus:outline-none"
          >
            Upload Wallpaper
          </Link>
        </div>

        {/* Uploaded Wallpapers Grid */}
        <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Your Uploaded Wallpapers</h2>
        <UploadedWallpaper />
      </div>
    </div>
  );
};

export default Profile;
