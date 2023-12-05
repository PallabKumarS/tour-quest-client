import PropTypes from "prop-types";
import ReactPlayer from "react-player/youtube";
import { gradientTextClasses } from "./CustomText";

const CustomReactPlayer = ({ url, name }) => {
  return (
    <div>
      <label
        className={`${gradientTextClasses} text-lg font-medium mb-2`}
        htmlFor=""
      >
        {name}
      </label>
      <br />
      <ReactPlayer width={`100%`} controls={true} url={url} />
    </div>
  );
};

CustomReactPlayer.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

export default CustomReactPlayer;
