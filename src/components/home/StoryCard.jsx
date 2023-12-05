import PropTypes from "prop-types";
import { PhotoView } from "react-photo-view";
import { useNavigate } from "react-router-dom";

const StoryCard = ({ story }) => {
  const navigate = useNavigate();
  const { _id, name, image, destination, experience } = story;
  return (
    <div
      onClick={() => navigate(`/stories/${_id}`)}
      className="card card-side bg-[#657bad99] shadow-xl mx-auto px-5 pt-5 items-center flex-col md:flex-row"
    >
      <div className=" card-body md:flex items-center">
        <figure>
          <PhotoView src={image}>
            <img
              className="rounded-full w-[200px] h-[170px]"
              src={image}
              alt=""
            />
          </PhotoView>
        </figure>
        <div className=" mx-auto">
          <p className="mb-3 text-[#804af3]">{name}</p>
          <p className="font-semibold text-[#e633d1e8]">
            Visited : {destination}
          </p>
        </div>
      </div>
      <p className="my-3 px-2 text-[#bfec91]">{experience.slice(0, 200)}...</p>
    </div>
  );
};

StoryCard.propTypes = {
  story: PropTypes.object,
};

export default StoryCard;
