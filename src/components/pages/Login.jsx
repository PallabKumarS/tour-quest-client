import { useState } from "react";
import { BsEyeSlashFill, BsEyeFill, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import MotionBtn, { customButtonClasses } from "../shared/MotionBtn";
import useAuth from "../shared/useAuth";
import { baseUrl } from "../shared/useAxios";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  // const axiosSecure = useAxios();

  const { handleAlert, googleLogIn, logIn, setLoading, fbLogIn, userData } =
    useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    logIn(email, password)
      .then(() => {
        navigate(location?.state ? location.state : "/");
        handleAlert("success", "User LoggedIn Successfully");
      })
      .catch((error) => {
        handleAlert("error", `${error.message}`);
        setLoading(false);
      });
  };

  const handleGoogleLogIn = async () => {
    setLoading(true);
    try {
      const result = await googleLogIn();
      const checkUser = await checkUserExists(result?.user?.email);
      if (checkUser) {
        navigate(location?.state ? location.state : "/");
        handleAlert("success", "User LoggedIn Successfully");
      } else {
        createRoles(result?.user?.email, result?.user?.displayName);
      }
    } catch (error) {
      handleAlert("error", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFBLogIn = async () => {
    setLoading(true);
    try {
      const result = await fbLogIn();
      const checkUser = await checkUserExists(result?.user?.email);
      if (checkUser) {
        navigate(location?.state ? location.state : "/");
        handleAlert("success", "User LoggedIn Successfully");
      } else {
        createRoles(result?.user?.email, result?.user?.displayName);
      }
    } catch (error) {
      handleAlert("error", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // const checkUserExists = (email) => {
  //   axiosSecure.get(`${baseUrl}/users?email=${email}`).then((res) => {
  //     if (res.data?.email == email) {
  //       setUserData(res.data);
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // };
  const checkUserExists = (email) => {
    if (userData.email == email) {
      return true;
    } else {
      return false;
    }
  };

  const createRoles = (email, name) => {
    const userData = {
      email: email,
      name: name,
      role: "tourist",
    };

    axios.post(`${baseUrl}/users?email=${email}`, userData).then((res) => {
      if (res.status == 201) {
        handleAlert("success", "User LoggedIn Successfully");
      }
    });
  };

  return (
    <div className="">
      <Helmet>
        <title>Tour Quest | Login</title>
      </Helmet>
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 py-5 md:w-3/4 xl:w-1/2 mx-auto mt-10 relative text-center mb-10 px-3 rounded-lg">
        <h2 className="text-3xl mt-5 mb-5 text-lime-500">Please Login Here</h2>

        <form onSubmit={handleLogIn}>
          <input
            className="w-3/4 mb-3 rounded-lg py-2 px-3 bg-black"
            type="email"
            name="email"
            placeholder="Enter a Valid Email"
            required
          />

          <br />
          <input
            className="w-3/4 mb-3 rounded-lg py-2 px-3 bg-black"
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter a Password"
            required
          />
          <span
            className="z-10 w-fit absolute translate-y-3/4 -translate-x-5"
            onClick={() => setShow(!show)}
          >
            {show ? <BsEyeFill></BsEyeFill> : <BsEyeSlashFill></BsEyeSlashFill>}
          </span>

          <br />
          <MotionBtn className={`w-3/4`} text={"Login"}></MotionBtn>
        </form>

        <div className="text-center mx-auto mb-3">
          <p className="mb-2 mt-2">Or Login Using</p>
          <button className={`${customButtonClasses} w-1/2`}>
            <FcGoogle
              onClick={handleGoogleLogIn}
              className="text-center mx-auto w-10 h-10"
            ></FcGoogle>
          </button>
          <p className="mb-2 mt-2">Or Register Using</p>
          <button className={`${customButtonClasses} w-1/2`}>
            <BsFacebook
              onClick={handleFBLogIn}
              className="text-center mx-auto w-10 h-10"
            ></BsFacebook>
          </button>
        </div>

        <p>
          Do not have an account? <br /> Please{" "}
          <span className="font-semibold text-lime-500 ml-2 hover:underline">
            <Link to="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
