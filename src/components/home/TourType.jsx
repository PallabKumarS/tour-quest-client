import CustomContainer from "../shared/CustomContainer";
import { register } from "swiper/element/bundle";
import Loader from "../shared/Loader";
import CustomSpinner from "../shared/CustomSpinner";
import { Link } from "react-router-dom";
register();

const TourType = () => {
  const { isLoading, data: tourInfo } = Loader(`/tours`, "toursInfo");

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  return (
    <CustomContainer className={"text-center mt-20"}>
      <section>
        <swiper-container
          slides-per-view="4"
          speed="500"
          loop="false"
          css-mode="true"
          navigation="true"
          pagination="true"
          scrollbar="true"
          centered-slides={true}
        >
          {tourInfo?.map((tour, idx) => (
            <swiper-slide key={idx}>
              <Link to={`/package-types/${tour.tourType}`}>
                <div className="bg-base-200 mx-1">
                  <img
                    className="mx-auto w-[300px] h-[250px] rounded-full"
                    src={tour?.tourTypeImage}
                    alt=""
                  />
                  <p className="font-semibold text-[#0ccec1db]">
                    {tour.tourType}
                  </p>
                </div>
              </Link>
            </swiper-slide>
          ))}
        </swiper-container>
      </section>
    </CustomContainer>
  );
};

export default TourType;
