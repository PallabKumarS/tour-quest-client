import { Link, NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { motion } from "framer-motion";
import { AiOutlineMenu } from "react-icons/ai";
import { TbBrandBooking, TbJewishStarFilled } from "react-icons/tb";
import { SiYourtraveldottv } from "react-icons/si";
import { IoMdAddCircle } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { Toaster } from "react-hot-toast";
import useAuth from "../shared/useAuth";
import Footer from "../layout/Footer";
import userLogo from "../../assets/user.png";
import CustomSpinner from "../shared/CustomSpinner";
const DashBoard = () => {
  const { user, logOut, handleAlert, roleLoading, userData } = useAuth();

  if (roleLoading) {
    return <CustomSpinner></CustomSpinner>;
  }
  const role = userData?.role || null;

  const signOut = () => {
    logOut()
      .then(() => {
        handleAlert("success", "Logout Successful");
      })
      .catch((error) => {
        handleAlert("error", error.message);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "font-extrabold text-yellow-500 mr-1"
              : "mr-1"
          }
          to={`/dashboard/profile`}
        >
          <CgProfile className="text-xl"></CgProfile>
          My Profile
        </NavLink>
      </li>
      <div>
        <hr />
      </div>

      {/* tourist routes  */}
      {role === "tourist" && (
        <div>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-extrabold text-yellow-500 mr-1"
                  : "mr-1"
              }
              to={"/dashboard/bookings"}
            >
              <TbBrandBooking className="text-xl"></TbBrandBooking>
              My Bookings
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-extrabold text-yellow-500 mr-1"
                  : "mr-1"
              }
              to={"/dashboard/wishlist"}
            >
              <TbJewishStarFilled className="text-xl"></TbJewishStarFilled>
              My WishList
            </NavLink>
          </li>
          <div>
            <hr />
          </div>
        </div>
      )}

      {/* guide route  */}
      {role === "guide" && (
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "font-extrabold text-yellow-500 mr-1"
                : "mr-1"
            }
            to={"/dashboard/assigned-tours"}
          >
            <SiYourtraveldottv></SiYourtraveldottv>
            Assigned Tours
          </NavLink>
        </li>
      )}

      {/* admin routes here  */}
      {role === "admin" && (
        <div>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-extrabold text-yellow-500 mr-1"
                  : "mr-1"
              }
              to={"/dashboard/add-package"}
            >
              <IoMdAddCircle className="text-xl"></IoMdAddCircle>
              Add Package
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "font-extrabold text-yellow-500 mr-1"
                  : "mr-1"
              }
              to={"/dashboard/manage-users"}
            >
              <MdManageAccounts className="text-xl"></MdManageAccounts>
              Manage Users
            </NavLink>
          </li>
        </div>
      )}
      <div>
        <hr />
      </div>
      <li>
        <a onClick={signOut}>
          <BiLogOutCircle className="text-xl"></BiLogOutCircle>
          Logout
        </a>
      </li>
    </>
  );
  return (
    <div>
      {/* navbar section */}
      <div className="bg-blue-200 bg-opacity-50 backdrop-blur-lg">
        <div className="navbar max-w-screen-xl mx-auto p-4">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                htmlFor="my-drawer-2"
                tabIndex={0}
                className="btn btn-ghost lg:hidden"
              >
                <AiOutlineMenu></AiOutlineMenu>
              </label>
            </div>
            <Link to={"/"}>
              <div className="flex items-center ">
                <img
                  className="md:w-1/4 w-6/12 mr-1 md:mr-3"
                  src="/logo.png"
                  alt=""
                />
                <span className="text-lg text-blue-500 md:text-2xl">Tour</span>{" "}
                <span className="text-customTextBG text-lg md:text-2xl font-semibold">
                  Quest
                </span>
              </div>
            </Link>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-bottom dropdown-end flex items-center">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {user?.photoURL ? (
                      <img src={user?.photoURL} />
                    ) : (
                      <img src={userLogo} />
                    )}
                  </div>
                </label>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row text-center items-center">
                <Link to={"/login"}>
                  <motion.button className="btn text-yellow-500 btn-xs md:btn-md hover border-none">
                    Login
                  </motion.button>
                </Link>
                <p className="text-lg mx-2">or</p>
                <Link to={"/register"}>
                  <motion.button className="btn text-yellow-500 btn-xs md:btn-md hover border-none">
                    Register
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* dashboard section */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          {/* Page content here */}
          <div className="min-h-[calc(100vh-200px)] lg:min-h-[calc(100vh-200px)]">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side z-0">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-fit min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div className="text-center mt-5">
              <h1 className="text-customTextBG font-bold">
                {user?.displayName}
              </h1>
              <h1 className="font-semibold">{user?.email}</h1>
            </div>
            <div className="md:mt-20 mt-32">{navLinks}</div>
          </ul>
        </div>
      </div>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default DashBoard;
