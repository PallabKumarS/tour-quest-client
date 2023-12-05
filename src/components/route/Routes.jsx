import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllPackages from "../pages/all package/AllPackages";
import GuideDetails from "../pages/guide/GuideDetails";
import FilteredPackages from "../pages/all package/FilteredPackages";
import PackageDetails from "../pages/all package/PackageDetails";
import AllStories from "../pages/Story/AllStories";
import StoryDetails from "../pages/Story/StoryDetails";
import Dashboard from "../dashboard/Dashboard";
import Profile from "../dashboard/Profile";
import PrivateRoute from "./PrivateRoute";
import AddPackage from "../dashboard/admin/AddPackage";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../dashboard/admin/ManageUsers";
import BookingList from "../dashboard/tourist/BookingList";
import WishList from "../dashboard/tourist/WishList";
import GuideRoute from "./GuideRoute";
import AssignedTours from "../dashboard/guide/AssignedTours";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/packages",
        element: <AllPackages></AllPackages>,
      },
      {
        path: "/packages/:id",
        element: <PackageDetails></PackageDetails>,
      },
      {
        path: "/package-types/:id",
        element: <FilteredPackages></FilteredPackages>,
      },
      {
        path: "/guides/:id",
        element: <GuideDetails></GuideDetails>,
      },
      {
        path: "/stories",
        element: <AllStories></AllStories>,
      },
      {
        path: "/stories/:id",
        element: <StoryDetails></StoryDetails>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/bookings",
        element: (
          <PrivateRoute>
            <BookingList></BookingList>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivateRoute>
            <WishList></WishList>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/assigned-tours",
        element: (
          <PrivateRoute>
            <GuideRoute>
              <AssignedTours></AssignedTours>
            </GuideRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-package",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddPackage></AddPackage>,
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>,
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
