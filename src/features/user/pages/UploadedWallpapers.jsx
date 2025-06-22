import { useEffect, useState } from "react";
import { getUserWallpapers } from "../services/userWallpaperService.js";
import WallpaperCard from "./UserWallpaperCard.jsx";

const UploadedWallpapers = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallpapers = async () => {
      const data = await getUserWallpapers();
      setWallpapers(data);
      setLoading(false);
    };

    fetchWallpapers();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading your wallpapers...</p>;

  if (!wallpapers.length) {
    return <p className="text-center mt-8 text-gray-500">No uploaded wallpapers yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {wallpapers.map((wallpaper) => (
        <WallpaperCard key={wallpaper._id} wallpaper={wallpaper} />
      ))}
    </div>
  );
};

export default UploadedWallpapers;
