import StoryCard from "../../home/StoryCard";
import CustomContainer from "../../shared/CustomContainer";

import Loader from "../../shared/Loader";
import CustomSpinner from "../../shared/CustomSpinner";

const AllStories = () => {
  const { isLoading, data: stories } = Loader(`/stories`, "story");

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  return (
    <CustomContainer className={`text-center mt-20`}>
      <div
        className={`grid grid-cols-1  lg:grid-cols-2 justify-center gap-10 mb-20 text-center`}
      >
        {stories?.map((story) => (
          <StoryCard key={story._id} story={story}></StoryCard>
        ))}
      </div>
    </CustomContainer>
  );
};

export default AllStories;
