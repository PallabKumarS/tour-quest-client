import { useParams } from "react-router-dom";
import CustomContainer from "../../shared/CustomContainer";
import Loader from "../../shared/Loader";
import CustomSpinner from "../../shared/CustomSpinner";
import { FacebookIcon, FacebookShareButton } from "react-share";
import { PhotoView } from "react-photo-view";

const StoryDetails = () => {
  const { id } = useParams();

  const currentUrl = window.location.href;

  const { isLoading, data: story } = Loader(`stories/${id}`, `/stories/${id}`);
  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  return (
    <CustomContainer>
      <div className="card lg:card-side shadow-xl mt-20 bg-[#657bad99]">
        <figure className="">
          <PhotoView src={story.image}>
            <img className="" src={story.image} alt="" />
          </PhotoView>
        </figure>
        <div className="card-body">
          <h2 className=" text-lg text-[#804af3]">{story.name}</h2>
          <p className="font-semibold text-lg text-[#e633d1e8]">
            Visited : {story.destination}
          </p>
          <div className="card-actions justify-end flex-1  items-center">
            <p className="text-[#bfec91]">{story.experience}</p>
            share :{" "}
            <FacebookShareButton url={currentUrl}>
              <FacebookIcon round size={50}></FacebookIcon>
            </FacebookShareButton>
          </div>
        </div>
      </div>
    </CustomContainer>
  );
};

export default StoryDetails;
