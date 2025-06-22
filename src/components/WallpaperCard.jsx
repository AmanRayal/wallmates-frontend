import { Download, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { downloadWallpaper, likeWallpaper } from "../services/wallpaperService.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const WallpaperCard = ({ wallpaper }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(wallpaper.likes || 0);
  const [downloadCount, setDownloadCount] = useState(wallpaper.downloads || 0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser && wallpaper.likedBy?.includes(storedUser._id)) {
      setIsLiked(true);
    }
  }, [wallpaper]);

  const handleView = () => {
    navigate(`/wallpapers/${wallpaper._id}`);
  };
  

  const handleDownload = async (e) => {
    e.stopPropagation();

    try {
      const res = await downloadWallpaper(wallpaper._id);
      setDownloadCount(res.message.downloads);

      const link = document.createElement("a");
      link.href = res.message.downloadUrl;
      link.download = wallpaper.title || "wallpaper";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download started!");
    } catch {
      toast.error("Failed to download wallpaper.");
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) return navigate("/login");

    try {
      const res = await likeWallpaper(wallpaper._id);
      setIsLiked(res.message.isLiked);
      setLikeCount(res.message.likes);
    } catch {
      toast.error("Failed to like wallpaper.");
    }
  };

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    
<div
  onClick={handleView}
  className="w-[90%] sm:w-56 md:w-64 lg:w-72 xl:w-70 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out"
  style={{ boxShadow: "10px 10px 10px rgb(0, 0, 0)" }}
>
  <div className="relative group h-40 overflow-hidden">
  {isVideo(wallpaper.urls[0]) ? (
    <video
      src={wallpaper.urls[0]}
      className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-300 ease-in-out"
      muted
      loop
      autoPlay
      playsInline
    />
  ) : (
    <img
      src={wallpaper.urls[0]}
      alt={wallpaper.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400 ease-in-out"
    />
  )}
  <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-black/30 to-transparent 
    opacity-0 sm:opacity-0 sm:group-hover:opacity-100 
    transition-opacity duration-300 ease-in-out z-0"
  />


  <div className="absolute bottom-0 left-0 w-full p-3 flex justify-center gap-3 sm:gap-4 
    opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
    transition-opacity duration-300 ease-in-out z-10"
  >
    <button
      onClick={handleDownload}
      className="bg-transparent text-white text-xs sm:text-sm px-2 sm:px-4 py-[2px] sm:py-1 rounded-full flex items-center transition-all duration-300 ease-in-out hover:bg-gray-600"
    >
      <Download size={14} className="inline-block mr-1" />
      <span className="hidden sm:inline">Download</span>
    </button>

    <button
      onClick={handleLike}
      className={`px-2 sm:px-4 py-[2px] sm:py-1 text-xs sm:text-sm rounded-full flex items-center gap-1 transition-all duration-300 ease-in-out ${
        isLiked
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-white text-black hover:bg-gray-100"
      }`}
    >
      <Heart
        size={14}
        className={isLiked ? "text-red-500 fill-red-500" : "text-gray-500"}
      />
      <span className="hidden sm:inline">{likeCount}</span>
    </button>
  </div>
</div>


</div>







  );
};

export default WallpaperCard;
