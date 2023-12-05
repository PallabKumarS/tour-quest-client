import CustomContainer from "../shared/CustomContainer";
import CustomSpinner from "../shared/CustomSpinner";
import Loader from "../shared/Loader";
import GuideCard from "./GuideCard";

const TourGuide = () => {
  const { isLoading, data: guides } = Loader("/guides", "tourguides");

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  return (
    <CustomContainer
      className={
        "grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 justify-center gap-5"
      }
    >
      {guides?.map((guide) => (
        <GuideCard key={guide._id} guide={guide}></GuideCard>
      ))}
    </CustomContainer>
  );
};

export default TourGuide;
