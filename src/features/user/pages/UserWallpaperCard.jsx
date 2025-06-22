import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { downloadWallpaper } from "../../../services/wallpaperService.js";
import { toast } from "react-toastify";

const UserWallpaperCard = ({ wallpaper }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/user/wallpapers/${wallpaper._id}`);
  };

  const handleDownload = async (e) => {
    e.stopPropagation();

    try {
      const res = await downloadWallpaper(wallpaper._id); // Now has access
      const downloadUrl = res?.message?.downloadUrl;

      if (downloadUrl) {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = wallpaper.title || "wallpaper";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Download started!");
      } else {
        toast.error("Invalid download URL.");
      }
    } catch (err) {
      toast.error("Failed to download wallpaper.");
    }
  };

  return (
    <div
      className="w-[90%] sm:w-56 md:w-64 lg:w-72 xl:w-60 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out relative group"
      style={{ boxShadow: "10px 10px 10px rgb(0, 0, 0)" }}
    >
      <div className="relative">
        <img
          src={wallpaper.urls[0]}
          onClick={handleView}
          className="w-full h-60 object-cover transition-transform duration-300 transform hover:scale-105"
        />

        {/* Hover Download Button for large screens */}
        <div className="absolute bottom-4 right-4 gap-2 items-center justify-center px-3 py-1 rounded-lg text-white bg-transparent backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block">
          <button
            onClick={handleDownload}
            className="text-white rounded-sm px-3 py-1"
          >
            Download
          </button>
        </div>

        {/* Icon Button for smaller screens */}
        <div className="absolute bottom-4 right-4 sm:block md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-transparent backdrop-blur-sm text-white shadow-md">
          <button onClick={handleDownload}>
            <FaDownload className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserWallpaperCard;
