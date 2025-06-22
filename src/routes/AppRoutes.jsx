import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import WallpaperDetail from "../pages/WallpaperDetail.jsx"; 
import Signup from "@/pages/SignUp.jsx";
import Login from "@/pages/Login.jsx";
import Profile from "../features/user/pages/Profile.jsx"
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import EditProfile from "../features/user/pages/EditProfile.jsx";
import ChangePassword from "../features/user/pages/ChangePassword.jsx";
import EditAvatar from "../features/user/pages/EditAvatar.jsx";
import UploadWallpaper from "../features/user/pages/UploadWallpapers.jsx";
import UserWallpaperDetail from "../features/user/pages/UserWallpaperDetail.jsx";
import EditWallpaper from "../features/user/pages/EditWallpaper.jsx";
import AdminLogin from "../features/admin/pages/AdminLogin.jsx";
import AdminDashboard from "../features/admin/pages/AdminDashboard.jsx";
import UploadAdminWallpaper from "@/features/admin/pages/UploadAdminWallpaper.jsx";
import PendingWallpapers from "@/features/admin/pages/PendingWallpapers.jsx";
import Search from "@/pages/Search.jsx";
// import AdminProtectedRoute from "@/components/AdminProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/wallpapers/:id",
    element: <WallpaperDetail />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-profile",
    element: (
    <ProtectedRoute>
      <EditProfile/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/change-password",
    element: (
    <ProtectedRoute>
      <ChangePassword/>,
      </ProtectedRoute>
    ),
  },
  {
    path: "/update-avatar",
    element: (
    <ProtectedRoute>
    <EditAvatar/>,
    </ProtectedRoute>
    )
  },
  {
    path: "/upload-wallpaper",
    element: (
    <ProtectedRoute>
    <UploadWallpaper />,
    </ProtectedRoute>
    )
  },
  {
    path: "/user/wallpapers/:wallpaperId",
    element: (
    <ProtectedRoute>
    <UserWallpaperDetail />
    </ProtectedRoute>
    )
  },
  {
    path: "edit-wallpaper/:wallpaperId",
    element: (
    <ProtectedRoute>
    <EditWallpaper/>
    </ProtectedRoute>
    )
  },
  
  {
  path: "/admin-login",
  element: <AdminLogin />,
  },

  {
  path: "/admin-dashboard",
  element:   <AdminDashboard />,
 
},
 {
  path: "/admin-dashboard/upload",
  element: <UploadAdminWallpaper />
 },
 {
  path: "/admin-dashboard/pending",
  element: <PendingWallpapers />
 },
 
 {
     
  path: "/search",
  element: <Search/>

 }




  
  
  
  
  
]);

export default router;
