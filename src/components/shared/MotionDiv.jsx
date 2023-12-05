import { motion } from "framer-motion";
import PropTypes from "prop-types";

const MotionDiv = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

MotionDiv.propTypes = {
  children: PropTypes.node,
};

export default MotionDiv;
