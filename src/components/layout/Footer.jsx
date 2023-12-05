import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import { gradientTextClasses } from "../shared/CustomText";
import logo from "/logo.png";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Footer = () => {
  const { handleAlert } = useContext(AuthContext);

  const handleNewsletter = (e) => {
    e.preventDefault();
    handleAlert("success", "You Have Successfully Submitted To Our Newsletter");
  };
  return (
    <div className="mt-20 text-center mx-auto">
      <footer className="footer p-10 bg-base-200 justify-evenly">
        <aside className="text-center">
          <img src={logo} alt="" />
          <p className={`text-lg font-medium ${gradientTextClasses}`}>
            <span className="text-3xl font-bold">Tour Quest</span>
            <br />
            Providing Reliable Service Since 2014
          </p>
        </aside>

        <div>
          <div className="mx-auto mb-10">
            <nav className="text-center mx-auto">
              <header
                className={`text-lg text-center mx-auto font-medium text-lime-500 mb-3`}
              >
                Social
              </header>
              <div className="grid grid-flow-col gap-10">
                <a>
                  <BsFacebook className="text-3xl text-blueViolet hover:link-hover"></BsFacebook>
                </a>
                <a>
                  <BsYoutube className="text-3xl text-blueViolet hover:link-hover"></BsYoutube>
                </a>
                <a>
                  <BsTwitter className="text-3xl text-blueViolet hover:link-hover"></BsTwitter>
                </a>
              </div>
            </nav>
          </div>
          <form className="mt-3 mb-2">
            <header className="footer-title">Newsletter</header>
            <fieldset className="form-control w-80">
              <label className="label">
                <span className="label-text">Enter your email address</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered w-full pr-16"
                />
                <button
                  onClick={handleNewsletter}
                  className="btn btn-primary absolute top-0 right-0 rounded-l-none"
                >
                  Subscribe
                </button>
              </div>
            </fieldset>
          </form>
          <p>Copyright © 2023 - All right reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
