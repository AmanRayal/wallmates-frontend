import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchWallpapers } from "../services/wallpaperService.js"; 
import WallpaperCard from "../components/WallpaperCard.jsx"; 
import Navbar from "@/components/Navbar.jsx";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      setLoading(true);
      setError(null); 
      try {
        const result = await searchWallpapers(query);
        setWallpapers(result.wallpapers);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Something went wrong while fetching search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
  <div>

    <Navbar/>

      <div className="min-h-screen w-full px-10 py-6 top-0 absolute bg-gray-900 text-white">
      <div className="flex items-center gap-2 mb-2 mt-25">
        <div className="w-3 h-12 bg-lime-500"></div>
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          Abstract / <span className="text-lime-500">{query} </span>
        </h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p> 
      ) : wallpapers.length === 0 ? (
        <p>No wallpapers found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {wallpapers.map((wallpaper) => (
            <WallpaperCard key={wallpaper._id} wallpaper={wallpaper} />
          ))}
        </div>
      )}
    </div>
</div>
  );
};

export default Search;
