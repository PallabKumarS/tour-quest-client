/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import CustomSpinner from "../../shared/CustomSpinner";
// import Loader from "../../shared/Loader";
import { headerClasses } from "../../shared/CustomText";

const TourGuideList = ({ guides, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }
  return (
    <div>
      <h2 className={`my-20 ${headerClasses}`}>Our Guides</h2>
      <div className="mt-20 flex flex-wrap justify-between gap-5">
        {guides?.map((guide) => (
          <div
            onClick={() => navigate(`/guides/${guide._id}`)}
            className="mx-auto bg-base-200 rounded-xl px-2"
            key={guide._id}
          >
            <figure className="mt-2">
              <img
                className="w-40 h-40 rounded-full mx-auto"
                src={guide.guideImage}
                alt=""
              />
            </figure>
            <p className="my-2 text-[#0aaefaf1]">{guide.name}</p>
            <p className="my-2 text-md font-medium text-[#13b2e3]">
              {guide.education}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourGuideList;
