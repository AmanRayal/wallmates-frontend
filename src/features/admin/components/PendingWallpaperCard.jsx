import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  approveWallpaper,
  rejectWallpaper,
} from "../services/adminService.js";
import { AwardIcon } from "lucide-react";


const PendingWallpaperCard = ({
  wallpaperId,
  title,
  category,
  createdAt,
  status,
  urls = [],
  onActionComplete,
}) => {
    console.log("wallpaperId in PendingWallpaperCard:", wallpaperId);
  const [isLoading, setIsLoading] = useState(false);


const handleApprove = async () => {
  setIsLoading(true);
  console.log("Approving wallpaper with ID:", wallpaperId); 
  
  // Ensure wallpaperId is valid
  if (!wallpaperId) {
    console.error("Invalid wallpaperId:", wallpaperId);
    toast.error("Wallpaper ID is missing.");
    setIsLoading(false);
    return;
  }

  try {
    const response = await approveWallpaper(wallpaperId);
    console.log("Approve response:", response); 
    toast.success("Wallpaper approved!");
    onActionComplete?.(wallpaperId);

  } catch (error) {
    console.error("Error approving wallpaper:", error); 
    toast.error(error.message || "Approval failed.");
  } finally {
    setIsLoading(false);
  }
};




  const handleReject = async () => {
    setIsLoading(true);
    try {
      await rejectWallpaper(wallpaperId);
      toast.success("Wallpaper rejected & deleted.");
      onActionComplete?.(wallpaperId);
    } catch (error) {
      toast.error(error.message || "Rejection failed.");
    } finally {
      setIsLoading(false);
    }
  };

 return (
  <div className="relative p-4 border rounded-xl shadow hover:shadow-lg transition group overflow-hidden">
    {urls.length > 0 && (
      <img
        src={urls[0]}
        alt={title}
        className="w-full h-48 object-cover rounded mb-2 transition-transform duration-300 group-hover:scale-105"
      />
    )}
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-500">Category: {category}</p>
    <p className="text-sm text-gray-500 capitalize">Status: {status}</p>
    <p className="text-xs text-gray-400">
      Uploaded: {new Date(createdAt).toLocaleString()}
    </p>

    {/* Hover overlay with smoother design */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
      <div className="flex gap-4">
        <button
          onClick={handleApprove}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm disabled:opacity-50 transition"
        >
          {isLoading ? "Approving..." : "Approve"}
        </button>
        <button
          onClick={handleReject}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50 transition"
        >
          {isLoading ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  </div>
);

};

export default PendingWallpaperCard;
