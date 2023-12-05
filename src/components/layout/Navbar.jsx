import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import userLogo from "../../assets/user.png";
import { useContext, useEffect, useState } from "react";
import { BiSolidMoon } from "react-icons/bi";
import { BsSun } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "../provider/AuthProvider";
import MotionBtn from "../shared/MotionBtn";

const NavBar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("lemonade");
  const toggleTheme = () => {
    setTheme(theme === "lemonade" ? "retro" : "lemonade");
  };
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending "
              : isActive
              ? "font-extrabold text-yellow-500 mr-1 bg-sky-600 p-3 rounded-lg"
              : "mr-1 text-sky-400 hover:text-yellow-500"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      {/* <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending "
              : isActive
              ? "font-extrabold text-yellow-500 mr-1 bg-sky-600 p-3 rounded-lg"
              : "mr-1 text-sky-400 hover:text-yellow-500"
          }
          to="/"
        >
          Community
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending "
              : isActive
              ? "font-extrabold text-yellow-500 mr-1 bg-sky-600 p-3 rounded-lg"
              : "mr-1 text-sky-400 hover:text-yellow-500"
          }
          to="/"
        >
          Blogs
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending "
              : isActive
              ? "font-extrabold text-yellow-500 mr-1 bg-sky-600 p-3 rounded-lg"
              : "mr-1 text-sky-400 hover:text-yellow-500"
          }
          to="/"
        >
          About Us
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending "
              : isActive
              ? "font-extrabold text-yellow-500 mr-1 bg-sky-600 p-3 rounded-lg"
              : "mr-1 text-sky-400 hover:text-yellow-500"
          }
          to="/"
        >
          Contact Us
        </NavLink>
      </li> */}

      {user ? (
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending "
                : isActive
                ? "font-extrabold text-yellow-500 mr-1 bg-sky-600 p-3 rounded-lg"
                : "mr-1 text-sky-400 hover:text-yellow-500"
            }
          >
            Dashboard
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending "
                : isActive
                ? "font-extrabold text-yellow-500 mr-1 bg-sky-600 p-3 rounded-lg"
                : "mr-1 text-sky-400 hover:text-yellow-500"
            }
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className="mx-auto navbar sticky top-0 z-[100] py-3 bg-navbarBG"
      style={{}}
    >
      <div className="justify-start flex-1">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <AiOutlineMenu></AiOutlineMenu>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 px-5 z-[100] p-2 shadow bg-base-200 rounded-box"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          <div className="flex flex-col md:flex-row items-center">
            <img src={logo} className="w-20" alt="" />
            <span className="text-blue-500 text-2xl font-semibold md:mr-1">
              Tour
            </span>{" "}
            <span className="text-sky-400 text-2xl font-semibold">Quest</span>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex justify-between flex-wrap">
        <ul className="menu-horizontal px-1 flex-wrap lg:gap-x-5 xl:gap-x-10">
          {links}
        </ul>
      </div>

      <div className="justify-end flex-1 ml-8">
        {user && (
          <p className="text-lg font-semibold text-lime-400">
            {user?.displayName}
          </p>
        )}

        <div className="dropdown dropdown-end mr-3 ml-3">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={userLogo} alt="" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow bg-base-100 rounded-box text-purple-400"
          >
            <li>
              {user ? (
                <>
                  {" "}
                  <p className="text-lg font-semibold text-lime-400 pointer-events-none">
                    {user?.email}
                  </p>
                  {/* <MotionBtn
                    className={`mx-auto`}
                    onClick={() => navigate(`/dashboard/profile`)}
                    text={"Dashboard"}
                  ></MotionBtn> */}
                  <MotionBtn
                    className={"mx-auto mt-2 mb-2"}
                    onClick={logOut}
                    text={"Logout"}
                    width={24}
                  ></MotionBtn>
                </>
              ) : (
                <Link to="/login">
                  <MotionBtn text={"Login"}></MotionBtn>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div>
          <label className="swap swap-rotate">
            <input onClick={toggleTheme} type="checkbox" />
            <div className="swap-on">
              <BiSolidMoon className="text-2xl text-sky-400 hover:text-yellow-500"></BiSolidMoon>
            </div>
            <div className="swap-off">
              <BsSun className="text-2xl text-yellow-400"></BsSun>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
