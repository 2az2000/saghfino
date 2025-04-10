import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Landing from "../pages/Landing/Landing";
import HomeProUser from "../pages/HomeProUser/HomeProUser";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import RentPage from "../pages/reantPage/RentPage";

/**
 * تعریف مسیرهای برنامه
 * - کاربران لاگین نشده فقط به صفحه Landing دسترسی دارند
 * - کاربران لاگین شده فقط به صفحه home-pro-user دسترسی دارند
 */
const routes = [
  // صفحه Landing - قابل دسترس برای همه
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Landing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/rentPage",
    element: <RentPage />,
  },

  // صفحه کاربر حرفه‌ای - فقط برای کاربران لاگین شده
  {
    path: "/home-pro-user",
    element: (
      <ProtectedRoute>
        <HomeProUser />
      </ProtectedRoute>
    ),
  },
];

export default routes;
