import { useState } from "react";
import { BsEyeSlashFill, BsEyeFill, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";
import MotionBtn, { customButtonClasses } from "../shared/MotionBtn";
import useAuth from "../shared/useAuth";
import { baseUrl } from "../shared/useAxios";
import axios from "axios";

const Register = () => {
  // const axiosSecure = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);

  const {
    handleAlert,
    googleLogIn,
    createUser,
    setLoading,
    fbLogIn,
    userData,
  } = useAuth();

  // const handleUploadImage = async () => {
  //   if (selectedImage) {
  //     const formData = new FormData();
  //     formData.append("image", selectedImage);

  //     const response = await fetch("https://api.imgur.com/3/image", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `${import.meta.env.IMGUR_TOKEN}`,
  //       },
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.data.link);
  //       return data.data.link;
  //     } else {
  //       console.error("Failed to upload image to Imgur.");
  //     }
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      handleAlert(
        "error",
        "Please enter a password with at least one upper case letter"
      );
      return;
    } else if (!/[A-Z]/.test(password)) {
      handleAlert(
        "error",
        "Please enter a password with at least one upper case letter"
      );
      return;
    } else if (!/[!@#$%^&*()_+]/.test(password)) {
      handleAlert(
        "error",
        "Please enter a password with at least one upper case letter"
      );
      return;
    }

    // if (selectedImage) {
    //   handleUploadImage(selectedImage)
    //     .then((url) => {
    //       createUser(email, password)
    //         .then((result) => {
    //           updateProfile(result.user, {
    //             displayName: name,
    //             photoURL: photo || url,
    //           });
    //           handleAlert("success", "User Created Successfully");
    //         })

    //         .catch((error) => {
    //           handleAlert("error", `${error.message}`);
    //           setLoading(false);
    //         });
    //     })
    //     .catch((error) => {
    //       handleAlert("error", `${error.message}`);
    //       setLoading(false);
    //     });
    // } else {

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
        createRoles(email, name);
        handleAlert("success", "User Created Successfully");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        handleAlert("error", `${error.message}`);
        setLoading(false);
      });
    // }

    form.reset();
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
        createRoles(result.user);
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
        createRoles(result.user);
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

    axios.post(`${baseUrl}/users`, userData).then((res) => {
      if (res.status == 201) {
        handleAlert("success", "User LoggedIn Successfully");
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>HE | Register</title>
      </Helmet>
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 py-5 md:w-3/4 xl:w-1/2 mx-auto mt-10 text-center mb-10 px-3 rounded-lg">
        <h2 className="text-3xl mt-5 mb-5 text-lime-500">
          Please Register Here
        </h2>

        <form onSubmit={handleRegister}>
          {/* name input  */}
          <input
            className="w-3/4 mb-3 rounded-lg py-2 px-3 bg-black"
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
          />

          <br />
          {/* photo input  */}
          <div
          // className="flex w-3/4 mx-auto gap-x-1"
          >
            <input
              className="w-3/4 mb-3 rounded-lg py-2 px-3 bg-black"
              type="text"
              name="photo"
              placeholder="Enter Your Photo Link"
            />
            {/* <p className=" text-lime-400 my-auto">Or</p> */}

            {/* photo drag and drop  */}
            {/* <div className="bg-input mb-2 rounded-lg">
              <label
                className=" text-blueViolet font-semibold hover:cursor-pointer mb-3"
                htmlFor=""
              >
                Input Your Photo here
              </label>
              <br />
              <input
                className=" mb-3 text-center hover:cursor-pointer text-blueViolet"
                type="file"
                name="image"
                id=""
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </div> */}
          </div>

          {/* email input  */}
          <input
            className="w-3/4 mb-3 rounded-lg py-2 px-3 bg-black"
            type="email"
            name="email"
            placeholder="Enter a Valid Email"
            required
          />

          <br />

          {/* password input  */}
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

          {/* register btn  */}
          <MotionBtn className={`w-3/4`} text={"Register"}></MotionBtn>
        </form>

        {/* login footer  */}
        <div className="text-center mx-auto mb-3">
          <p className="mb-2 mt-2">Or Register Using</p>
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
          Already have an account? <br /> Please{" "}
          <span className="font-semibold text-lime-500 ml-2 hover:underline">
            <Link to="/login">LogIn</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
