// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../services/api.js";
// import { Download, Eye } from "lucide-react";
// import { toast } from "react-toastify";
// import Navbar from "@/components/Navbar.jsx";
// import { Image as ImageIcon } from "lucide-react";


// import { downloadWallpaper} from "../services/wallpaperService.js";

// const WallpaperDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [wallpaper, setWallpaper] = useState(null);
//   const [relatedWallpapers, setRelatedWallpapers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

//   useEffect(() => {
//     const fetchWallpaper = async () => {
//       setLoading(true);
//       setWallpaper(null);

//       try {
//         const res = await api.get(`/wallpapers/getSinglewallpapers/${id}`);
//         setWallpaper(res.data?.message);
//       } catch (error) {
//         console.error("Failed to fetch wallpaper detail:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWallpaper();
//   }, [id]);

//   useEffect(() => {
//     if (!wallpaper) return;

//     const fetchAllWallpapers = async () => {
//       try {
//         const res = await api.get(`/wallpapers/getAllWallpapers?page=1&limit=100`);
//         const all = res.data?.data?.wallpapers || [];

//         const related = all.filter((w) => {
//           if (w._id === wallpaper._id) return false;
//           const sameCategory = w.category?.toLowerCase().includes(wallpaper.category?.toLowerCase());
//           const hasCommonTags = w.tags?.some((tag) => wallpaper.tags?.includes(tag));
//           return sameCategory || hasCommonTags;
//         });

//         setRelatedWallpapers(related.slice(0, 8));
//       } catch (err) {
//         console.error("Error fetching related wallpapers:", err);
//       }
//     };

//     fetchAllWallpapers();
//   }, [wallpaper]);

//   const [downloadCount, setDownloadCount] = useState(0);


//   const handleDownload = async (e) => {
//     e.stopPropagation();

//     try {
//       const res = await downloadWallpaper(wallpaper._id);
//       setDownloadCount(res.message.downloads);

//       const link = document.createElement("a");
//       link.href = res.message.downloadUrl;
//       link.download = wallpaper.title || "wallpaper";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       toast.success("Download started!");
//     } catch {
//       toast.error("Failed to download wallpaper.");
//     }
//   };

//   if (loading) return <div className="text-center p-6">Loading wallpaper details...</div>;
//   if (!wallpaper) return <div className="text-center text-red-500 p-6">Wallpaper not found</div>;

//   return (
//     <div style={{ backgroundColor: "rgb(17,20,23)" }}>
//     <Navbar/>
//     <div className="max-w-4xl mx-auto px-4 py-8 ">
      


//       <div className="flex items-center gap-2 mb-2">
//         <div className="w-3 h-12 bg-lime-500"></div>
//         <h2 className="text-xl sm:text-2xl font-semibold text-white">
//           Abstract / <span className="text-lime-500">{wallpaper.title} </span>
//         </h2>
//       </div>

  
//       {wallpaper.description && (
//         <p className="text-sm text-gray-600 mb-4">{wallpaper.description}</p>
//       )}

    
// {wallpaper.urls?.[0] ? (
//   isVideo(wallpaper.urls[0]) ? (
//     <div className="mx-auto w-full sm:w-[90%] md:w-[80%] lg:w-[100%] mb-6">
//       <video
//         src={wallpaper.urls[0]}
//         className="w-full h-[250px] sm:h-[350px] md:h-[475px] object-cover rounded-t-4xl"
//         muted
//         autoPlay
//         loop
//         playsInline
//       />
//     </div>
//   ) : (
//     <div className="mx-auto w-full sm:w-[90%] md:w-[80%] lg:w-[100%] mb-6 ">
//       <img
//         src={wallpaper.urls[0]}
//         alt={wallpaper.title}
//         className="w-full h-[250px] sm:h-[350px] md:h-[475px] object-cover rounded-t-4xl"
//       />
//     </div>
//   )
// ) : (
//   <div className="text-center text-sm text-gray-400 mb-6">Image not available</div>
// )}



    
//       <div className="mb-10 flex justify-center">
//         <button
//           onClick={handleDownload}
//           className="flex items-center gap-2 bg-lime-600 text-white px-5 py-2 rounded-lg hover:bg-lime-700 transition"
//         >
//           <Download size={18} />
//           <span>Download</span>
//         </button>
//       </div>

//       {/* Related Wallpapers */}
//       <div className="mt-8">
//        <h3 className="text-2xl font-semibold ml-6 mb-6 text-white flex items-center gap-2">
//   <ImageIcon size={32} className="text-lime-500" />
//   Related Wallpapers
// </h3>

//         {relatedWallpapers.length === 0 ? (
//           <p className="text-sm text-gray-500">No related wallpapers found.</p>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {relatedWallpapers.map((w) => (
//   <div
//     key={w._id}
//     className="relative group rounded-xl overflow-hidden cursor-pointer transition duration-300"
//     onClick={() => navigate(`/wallpapers/${w._id}`)}
//   >
//     {isVideo(w.urls?.[0]) ? (
//       <video
//         src={w.urls?.[0]}
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="w-full h-40 object-cover pointer-events-none"
//       />
//     ) : (
//       <img
//         src={w.urls?.[0]}
//         alt={w.title}
//         className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
//       />
//     )}

//     {/* Overlay for Download Button */}
//    <div className="absolute inset-0  transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
//   {/* Desktop Button (bottom right) */}
//   <div className="hidden sm:flex absolute bottom-2 right-2">
//     <button
//       onClick={async (e) => {
//         e.stopPropagation();
//         try {
//           const res = await downloadWallpaper(w._id);
//           const link = document.createElement("a");
//           link.href = res.message.downloadUrl;
//           link.download = w.title || "wallpaper";
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//           toast.success("Download started!");
//         } catch {
//           toast.error("Failed to download wallpaper.");
//         }
//       }}
//       className="bg-white/90 text-black px-3 py-1 rounded-md text-sm flex items-center gap-1 hover:bg-white"
//     >
//       <Download size={16} />
//       <span>Download</span>
//     </button>
//   </div>

//   {/* Mobile Icon (centered) */}
//   {/* Mobile Icon (bottom right) */}
// <div className="sm:hidden absolute bottom-2 right-2">
//   <button
//     onClick={async (e) => {
//       e.stopPropagation();
//       try {
//         const res = await downloadWallpaper(w._id);
//         const link = document.createElement("a");
//         link.href = res.message.downloadUrl;
//         link.download = w.title || "wallpaper";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         toast.success("Download started!");
//       } catch {
//         toast.error("Failed to download wallpaper.");
//       }
//     }}
//     className="bg-white/30 text-black p-3 rounded-full backdrop-blur-2xl "
//   >
//     <Download size={20} />
//   </button>
// </div>

// </div>



//     {/* Title Section */}
//     {/* <div className="p-2 bg-white">
//       <p className="text-sm font-medium truncate">{w.title}</p>
//       <p className="text-xs text-gray-500 truncate">{w.category}</p>
//     </div> */}
//   </div>
// ))}

//           </div>
//         )}
//       </div>
//     </div>
//   </div>
//   );
  
// };

// export default WallpaperDetail;



import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { Download, Eye } from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar.jsx";
import { Image as ImageIcon } from "lucide-react";
import { downloadWallpaper } from "../services/wallpaperService.js";

const WallpaperDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wallpaper, setWallpaper] = useState(null);
  const [relatedWallpapers, setRelatedWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadCount, setDownloadCount] = useState(0);

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  useEffect(() => {
    const fetchWallpaper = async () => {
      setLoading(true);
      setWallpaper(null);

      try {
        const res = await api.get(`/api/v1/wallpapers/getSinglewallpapers/${id}`);
        setWallpaper(res.data?.message);
      } catch (error) {
        console.error("Failed to fetch wallpaper detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallpaper();
  }, [id]);

  useEffect(() => {
    if (!wallpaper) return;

    const fetchAllWallpapers = async () => {
      try {
        const res = await api.get(`/api/v1/wallpapers/getAllWallpapers?page=1&limit=100`);
        const all = res.data?.data?.wallpapers || [];

        const related = all.filter((w) => {
          if (w._id === wallpaper._id) return false;
          const sameCategory = w.category?.toLowerCase().includes(wallpaper.category?.toLowerCase());
          const hasCommonTags = w.tags?.some((tag) => wallpaper.tags?.includes(tag));
          return sameCategory || hasCommonTags;
        });

        setRelatedWallpapers(related.slice(0, 8));
      } catch (err) {
        console.error("Error fetching related wallpapers:", err);
      }
    };

    fetchAllWallpapers();
  }, [wallpaper]);

  const handleDownload = async (e) => {
    e.stopPropagation();

    try {
      const res = await downloadWallpaper(wallpaper._id);
      setDownloadCount(res.message.downloads);

      const link = document.createElement("a");
      link.href = res.message.downloadUrl;
      link.setAttribute("download", wallpaper.title || "wallpaper");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download started!");
    } catch {
      toast.error("Failed to download wallpaper.");
    }
  };

  const handleCustomDownload = (label, width, height) => {
    const parts = wallpaper.urls[0].split("/upload/");
    const url = `${parts[0]}/upload/fl_attachment:${wallpaper.title}-${label},w_${width},h_${height},c_fill,q_auto:good,f_auto/${parts[1]}`;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${wallpaper.title}-${label}.jpg`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="text-center p-6">Loading wallpaper details...</div>;
  if (!wallpaper) return <div className="text-center text-red-500 p-6">Wallpaper not found</div>;

  return (
    <div style={{ backgroundColor: "rgb(17,20,23)" }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-12 bg-lime-500"></div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Abstract / <span className="text-lime-500">{wallpaper.title} </span>
          </h2>
        </div>

        {wallpaper.description && (
          <p className="text-sm text-gray-400 mb-4">{wallpaper.description}</p>
        )}

        {wallpaper.urls?.[0] ? (
          isVideo(wallpaper.urls[0]) ? (
            <div className="mx-auto w-full sm:w-[90%] md:w-[80%] lg:w-[100%] mb-6">
              <video
                src={wallpaper.urls[0]}
                className="w-full h-[250px] sm:h-[350px] md:h-[475px] object-cover rounded-t-4xl"
                muted
                autoPlay
                loop
                playsInline
              />
            </div>
          ) : (
            <div className="mx-auto w-full sm:w-[90%] md:w-[80%] lg:w-[100%] mb-6">
              <img
                src={wallpaper.urls[0]}
                alt={wallpaper.title}
                className="w-full h-[250px] sm:h-[350px] md:h-[475px] object-cover rounded-t-4xl"
              />
            </div>
          )
        ) : (
          <div className="text-center text-sm text-gray-400 mb-6">Image not available</div>
        )}

      {/* === Download Buttons: Original and 4K === */}
<div className="mb-6 flex flex-wrap justify-center gap-4">
  <button
    onClick={() => handleCustomDownload("4K", 3840, 2160)}
    className="w-[260px] flex items-center justify-center gap-2 bg-[#1c1f23] text-white text-base px-6 py-4 rounded-lg hover:text-lime-400 transition"
  >
    <Download size={20} />
    <span>Download Original</span>
  </button>

  <button
    onClick={handleDownload}
    className="w-[260px] flex items-center justify-center gap-2 bg-[#1c1f23] text-white text-base px-6 py-3 rounded-lg hover:text-lime-400 transition"
  >
    <Download size={20} />
    <span>Download in 4K</span>
  </button>
</div>

{/* === More Resolutions Section === */}
<div className="mb-10 px-4">
  <div className="bg-[#0e0f12] shadow-md rounded-md p-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 flex-wrap border border-[#3A3F45]">
    <h4 className="text-[#96ff00] font-semibold text-base whitespace-nowrap">
      More Resolutions:
    </h4>

    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
      <button
        onClick={() => handleCustomDownload("HD", 1280, 720)}
        className="w-full sm:w-[140px] flex items-center justify-center gap-2 bg-[#1c1f23] text-white px-4 py-2 rounded-lg hover:bg-[#3A3F45] transition font-medium"
      >
        <Monitor size={18} />
        <span>HD</span>
      </button>

      <button
        onClick={() => handleCustomDownload("Mobile", 720, 1280)}
        className="w-full sm:w-[140px] flex items-center justify-center gap-2 bg-[#1c1f23] text-white px-4 py-2 rounded-lg hover:bg-[#3A3F45] transition font-medium"
      >
        <Smartphone size={18} />
        <span>Mobile</span>
      </button>

      <button
        onClick={() => handleCustomDownload("Tablet", 1536, 2048)}
        className="w-full sm:w-[140px] flex items-center justify-center gap-2 bg-[#1c1f23] text-white px-4 py-2 rounded-lg hover:bg-[#3A3F45] transition font-medium"
      >
        <Tablet size={18} />
        <span>Tablet</span>
      </button>
    </div>
  </div>
</div>



        {/* === Related Wallpapers Section === */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold ml-6 mb-6 text-white flex items-center gap-2">
            <ImageIcon size={32} className="text-lime-500" />
            Related Wallpapers
          </h3>

          {relatedWallpapers.length === 0 ? (
            <p className="text-sm text-gray-500">No related wallpapers found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedWallpapers.map((w) => (
                <div
                  key={w._id}
                  className="relative group rounded-xl overflow-hidden cursor-pointer transition duration-300"
                  onClick={() => navigate(`/wallpapers/${w._id}`)}
                >
                  {isVideo(w.urls?.[0]) ? (
                    <video
                      src={w.urls?.[0]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-40 object-cover pointer-events-none"
                    />
                  ) : (
                    <img
                      src={w.urls?.[0]}
                      alt={w.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WallpaperDetail;



