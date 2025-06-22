import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  setAuth: ({ user }) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useAuthStore;





// import { create } from "zustand";

// const useAuthStore = create((set) => ({
//   user: null, // Start with null, will be updated on initial load

//   // Function to set user data and persist in localStorage
//   setAuth: ({ user }) => {
//     try {
//       if (user) {
//         localStorage.setItem("user", JSON.stringify(user));
//       } else {
//         localStorage.removeItem("user");
//       }
//     } catch (error) {
//       console.error("Error saving to localStorage:", error);
//     }
//     set({ user });
//   },

//   // Function to log out the user
//   logout: () => {
//     try {
//       localStorage.removeItem("user");
//     } catch (error) {
//       console.error("Error removing from localStorage:", error);
//     }
//     set({ user: null });
//   },

//   // Initialize the user state by checking localStorage
//   initializeUser: () => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       const user = storedUser ? JSON.parse(storedUser) : null;
//       set({ user });
//     } catch (error) {
//       console.error("Error parsing stored user:", error);
//       set({ user: null });
//     }
//   },
// }));

// export default useAuthStore;

