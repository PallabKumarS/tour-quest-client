import PropTypes from "prop-types";
import MotionBtn from "../shared/MotionBtn";
import { useNavigate } from "react-router-dom";
import { PhotoView } from "react-photo-view";

const GuideCard = ({ guide }) => {
  const navigate = useNavigate();
  const { _id, guideImage, name, education, skills } = guide;

  return (
    <div className="card glass w-[420px] bg-[#9cedddda] shadow-xl mx-auto  ">
      <figure className="px-10 pt-10">
        <PhotoView src={guideImage}>
          <img
            src={guideImage}
            alt=""
            className="rounded-xl w-[500px] h-[350px]"
          />
        </PhotoView>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-[#0aaefaf1]">{name}</h2>
        <p className="text-md font-medium text-[#13b2e3]">{education}</p>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-teal-600">
            Language Skills
          </h3>
          {skills?.languages?.map((skill, idx) => (
            <p key={idx} className="text-md font-medium text-[#de0b0bc1]">
              {skill}
            </p>
          ))}
        </div>

        <div className="card-actions">
          <MotionBtn
            onClick={() => navigate(`/guides/${_id}`)}
            text={"Details"}
          ></MotionBtn>
        </div>
      </div>
    </div>
  );
};

GuideCard.propTypes = {
  guide: PropTypes.object,
};

export default GuideCard;
