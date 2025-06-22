// import { useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import WallpaperCard from "@/components/WallpaperCard";
// import { getAllWallpapers, searchWallpapers } from "@/services/wallpaperService";

// const WallpaperGrid = () => {
//   const [wallpapers, setWallpapers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const location = useLocation();

//   const query = new URLSearchParams(location.search).get("query");
//   const limit = 20;

//   const gridRef = useRef(null); 

//   useEffect(() => {
//     const fetchWallpapers = async () => {
//       setLoading(true);
//       try {
//         let response;

//         if (query) {
//           response = await searchWallpapers(query);
//           setWallpapers(response || []);
//           setTotalPages(1); 
//         } else {
//           response = await getAllWallpapers(currentPage, limit);
//           setWallpapers(response.wallpapers || []);
//           setTotalPages(response.totalPages || 1);
//         }
//       } catch (error) {
//         console.error("Wallpaper fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWallpapers();
//   }, [query, currentPage]);

//   useEffect(() => {
//     if (gridRef.current) {
//       gridRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start", 
//       });
//     }
//   }, [currentPage]);

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   return (
//     <div
//       style={{ backgroundColor: "rgb(17,20,23)", minHeight: "80vh" }}
//       className="py-6 border-none outline-none"
//     >
//       {loading ? (
//         <div className="flex justify-center items-center min-h-[80vh]">
//           <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

//         </div>
//       ) : !wallpapers.length ? (
//         <p className="text-center mt-10 text-gray-500">No wallpapers found.</p>
//       ) : (
//         <>
//           <div
//             ref={gridRef}
//             className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 gap-x-0 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 container mx-auto overflow-hidden"
//           >
//             {wallpapers.map((wallpaper) => (
//               <WallpaperCard key={wallpaper._id} wallpaper={wallpaper} />
//             ))}
//           </div>

//           {!query && (
//             <div className="mt-10 flex justify-center items-center gap-4 text-white">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
//               <button
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}

     
//     </div>
//   );
// };

// export default WallpaperGrid;



// import { useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import WallpaperCard from "@/components/WallpaperCard";
// import CategorySection from "@/components/CategorySection"; // Import karo yahan
// import { getAllWallpapers, searchWallpapers } from "@/services/wallpaperService";

// const WallpaperGrid = () => {
//   const [wallpapers, setWallpapers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const location = useLocation();

//   const query = new URLSearchParams(location.search).get("query");
//   const limit = 20;

//   const scrollTargetRef = useRef(null); // Yeh ref CategorySection ke liye
//   const gridRef = useRef(null);

//   useEffect(() => {
//     const fetchWallpapers = async () => {
//       setLoading(true);
//       try {
//         let response;

//         if (query) {
//           response = await searchWallpapers(query);
//           setWallpapers(response || []);
//           setTotalPages(1);
//         } else {
//           response = await getAllWallpapers(currentPage, limit);
//           setWallpapers(response.wallpapers || []);
//           setTotalPages(response.totalPages || 1);
//         }
//       } catch (error) {
//         console.error("Wallpaper fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWallpapers();
//   }, [query, currentPage]);

//  useEffect(() => {
//   if (!loading && scrollTargetRef.current) {
//     const elementPosition = scrollTargetRef.current.getBoundingClientRect().top + window.pageYOffset;
//     const offset = 120; // aap is value ko apne hisaab se change kar sakte hain
//     window.scrollTo({
//       top: elementPosition - offset,
//       behavior: "smooth",
//     });
//   }
// }, [currentPage, loading]);


//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   return (
//     <div
//       style={{ backgroundColor: "rgb(17,20,23)", minHeight: "80vh" }}
//       className="py-6 border-none outline-none"
//     >
//       {/* CategorySection yahan ref ke sath */}
//       <CategorySection ref={scrollTargetRef} />

//       {loading ? (
//         <div className="flex justify-center items-center min-h-[90vh]">
//           <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : !wallpapers.length ? (
//         <p className="text-center mt-10 text-gray-500">No wallpapers found.</p>
//       ) : (
//         <>
//           <div
//             ref={gridRef}
//             className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 gap-x-0 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 container mx-auto overflow-hidden"
//           >
//             {wallpapers.map((wallpaper) => (
//               <WallpaperCard key={wallpaper._id} wallpaper={wallpaper} />
//             ))}
//           </div>

//           {!query && (
//             <div className="mt-10 flex justify-center items-center gap-4 text-white">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-lg font-semibold">
//                 {currentPage} / {totalPages}
//               </span>
//               <button
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default WallpaperGrid;


import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import WallpaperCard from "@/components/WallpaperCard";
import CategorySection from "@/components/CategorySection";
import { getAllWallpapers, searchWallpapers } from "@/services/wallpaperService";

const WallpaperGrid = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isButtonClicked, setIsButtonClicked] = useState(false); // NEW

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const limit = 20;

  const scrollTargetRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchWallpapers = async () => {
      setLoading(true);
      try {
        let response;
        if (query) {
          response = await searchWallpapers(query);
          setWallpapers(response || []);
          setTotalPages(1);
        } else {
          response = await getAllWallpapers(currentPage, limit);
          setWallpapers(response.wallpapers || []);
          setTotalPages(response.totalPages || 1);
        }
      } catch (error) {
        console.error("Wallpaper fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallpapers();
  }, [query, currentPage]);

  useEffect(() => {
    if (!loading && isButtonClicked && scrollTargetRef.current) {
      const elementPosition =
        scrollTargetRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offset = 120;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  }, [currentPage, loading, isButtonClicked]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setIsButtonClicked(true); 
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setIsButtonClicked(true); 
    }
  };

  return (
    <div
      style={{ backgroundColor: "rgb(17,20,23)", minHeight: "80vh" }}
      className="py-6 border-none outline-none"
    >
   
      <CategorySection ref={scrollTargetRef} currentPage={currentPage} />


      {loading ? (
        <div className="flex justify-center items-center min-h-[90vh]">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : !wallpapers.length ? (
        <p className="text-center mt-10 text-gray-500">No wallpapers found.</p>
      ) : (
        <>
          <div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 gap-x-0 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 container mx-auto overflow-hidden"
          >
            {wallpapers.map((wallpaper) => (
              <WallpaperCard key={wallpaper._id} wallpaper={wallpaper} />
            ))}
          </div>

         {!query && (
  <div className="mt-10 flex justify-center items-center gap-2 sm:gap-3 text-white flex-wrap">

    {/* Previous Button */}
    {currentPage > 1 && (
      <button
        onClick={handlePrev}
        className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-xl bg-gray-700 rounded hover:bg-green-500 hover:text-black shadow-md transition-all duration-300"
      >
        Previous
      </button>
    )}

    {/* Page Buttons with Ellipsis */}
    {[...Array(totalPages)].map((_, index) => {
      const page = index + 1;

      if (
        page === 1 ||
        page === totalPages ||
        Math.abs(currentPage - page) <= 1
      ) {
        return (
          <button
            key={page}
            onClick={() => {
              setCurrentPage(page);
              setIsButtonClicked(true);
            }}
            className={`px-3 sm:px-5 py-2 sm:py-3 text-base sm:text-xl rounded shadow-md transition-all duration-300 ${
              currentPage === page
                ? "bg-green-500 text-black"
                : "bg-gray-700 hover:bg-green-500 hover:text-black"
            }`}
          >
            {page}
          </button>
        );
      }

      // Ellipsis
      if (
        (page === currentPage - 2 && page > 2) ||
        (page === currentPage + 2 && page < totalPages - 1)
      ) {
        return (
          <span
            key={page}
            className="px-2 text-gray-400 text-base sm:text-xl"
          >
            ...
          </span>
        );
      }

      return null;
    })}

    {/* Next Button */}
    {currentPage < totalPages && (
      <button
        onClick={handleNext}
        className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-xl bg-gray-700 rounded hover:bg-green-500 hover:text-black shadow-md transition-all duration-300"
      >
        Next
      </button>
    )}
  </div>
)}



        </>
      )}
    </div>
  );
};

export default WallpaperGrid;

