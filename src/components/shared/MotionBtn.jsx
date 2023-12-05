import PropTypes from "prop-types";
import { motion } from "framer-motion";

export const customButtonClasses =
  "py-2 px-4 text-lime-400 text-md rounded-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500";

const MotionBtn = ({ className, text, onClick = null }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${customButtonClasses} ${className} `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {text}
    </motion.button>
  );
};

MotionBtn.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default MotionBtn;
