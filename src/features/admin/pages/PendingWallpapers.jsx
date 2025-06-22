import { useEffect, useState } from "react";
import { getPendingWallpapers } from "../services/adminService.js";
import PendingWallpaperCard from "../components/PendingWallpaperCard";
import { toast } from "react-toastify";

const PendingWallpapers = () => {
  const [pending, setPending] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getPendingWallpapers();
      console.log("Fetched wallpapers:", data);
      setPending(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleActionComplete = (id) => {
    setPending((prev) => prev.filter((wp) => wp._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Wallpapers</h2>
      {pending.length === 0 ? (
        <p className="text-gray-500">No pending wallpapers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pending.map((wp) => (
            <PendingWallpaperCard
              key={wp._id}
              wallpaperId={wp._id}
              title={wp.title}
              category={wp.category}
              createdAt={wp.createdAt}
              status={wp.status}
              urls={wp.urls}
              onActionComplete={handleActionComplete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingWallpapers;
