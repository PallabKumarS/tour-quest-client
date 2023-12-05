import { useNavigate } from "react-router-dom";
import CustomContainer from "../shared/CustomContainer";
import CustomSpinner from "../shared/CustomSpinner";
import Loader from "../shared/Loader";
import MotionBtn from "../shared/MotionBtn";
import StoryCard from "./StoryCard";

const HomeStories = () => {
  const navigate = useNavigate();
  const { isLoading, data: stories } = Loader(`/stories`, "story");

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }
  return (
    <CustomContainer className={`text-center`}>
      <div
        className={`grid grid-cols-1  lg:grid-cols-2 justify-center gap-10 mb-20 text-center`}
      >
        {stories?.slice(0, 4)?.map((story) => (
          <StoryCard key={story._id} story={story}></StoryCard>
        ))}
      </div>

      <MotionBtn
        onClick={() => navigate(`/stories`)}
        text={`All Stories`}
      ></MotionBtn>
    </CustomContainer>
  );
};

export default HomeStories;
