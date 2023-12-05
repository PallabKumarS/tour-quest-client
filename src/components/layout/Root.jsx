import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import { Toaster } from "react-hot-toast";
import "@smastrom/react-rating/style.css";

const Root = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    top: "5rem",
  });
  return (
    <div className="">
      <NavBar></NavBar>
      <motion.div
        className="fixed top-16 left-0 right-0 h-[10px] bg-blueViolet origin-[0] z-[50]"
        style={{ scaleX }}
      />

      <Outlet></Outlet>

      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default Root;
