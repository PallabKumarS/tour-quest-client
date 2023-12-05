/* eslint-disable react/prop-types */
// import PropTypes from "prop-types";
import { gradientTextClasses } from "./CustomText";
import { Typewriter } from "react-simple-typewriter";

const TypeWriterCustom = ({ text, size = 3 }) => {
  return (
    <h1
      className={`text-center font-bold mt-10 text-${size}xl mb-5 ${gradientTextClasses}`}
    >
      <Typewriter
        words={text}
        loop={false}
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </h1>
  );
};

// TypeWriterCustom.propTypes = {
//   text: PropTypes.array,
//   size: PropTypes.number,
// };

export default TypeWriterCustom;
