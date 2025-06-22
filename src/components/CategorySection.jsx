// import { forwardRef } from "react";

// const CategorySection = forwardRef((props, ref) => {
//   return (
//     <div
//       ref={ref}
//       className="py-6 border-0"
//       style={{ backgroundColor: "rgb(17, 20, 23)" }}
//     >
//       <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
//         <div className="flex items-center gap-4">
//           <div className="w-3 h-14 bg-green-500 border-0" />
//           <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide leading-snug">
//             <span className="text-green-400">Recent</span> Wallpapers
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default CategorySection;


import { forwardRef } from "react";

const CategorySection = forwardRef(({ currentPage }, ref) => {
  return (
    <div
      ref={ref}
      className="py-6 border-0"
      style={{ backgroundColor: "rgb(17, 20, 23)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="flex items-center gap-4">
          <div className="w-3 h-14 bg-green-500 border-0" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide leading-snug">
            <span className="text-green-400">Recent</span> Wallpapers 
            {currentPage > 1 && (
              <span className="ml-2 text-xl text-white">
               - Page {currentPage}
              </span>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
});

export default CategorySection;
