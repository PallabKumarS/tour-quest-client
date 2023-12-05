import { useParams } from "react-router-dom";
import CustomContainer from "../../shared/CustomContainer";
import CustomSpinner from "../../shared/CustomSpinner";
import ImageGallery from "../../shared/ImageGallery";
import Loader from "../../shared/Loader";
import BookingForm from "./BookingForm";
import TourGuideList from "./TourGuideList";
import TourPlan from "./TourPlan";

const PackageDetails = () => {
  const { id } = useParams();
  const { isLoading, data: imagesObj } = Loader(`/images/${id}`, "images");

  const { isLoading: loading2, data: guides } = Loader("/guides", "guides");

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  } else if (loading2) {
    return <CustomSpinner></CustomSpinner>;
  }


  // if (isLoading) {
  //   return <CustomSpinner></CustomSpinner>;
  // }

  return (
    <CustomContainer className={`text-center`}>
      {/* gallery section  */}
      <section>
        <ImageGallery images={imagesObj.images}></ImageGallery>
      </section>

      {/* tour plan section  */}
      <section>
        <TourPlan></TourPlan>
      </section>

      {/* tour guide section  */}
      <section>
        <TourGuideList guides={guides} isLoading={isLoading}></TourGuideList>
      </section>

      {/* Booking form here  */}
      <section>
        <BookingForm
          guides={guides}
          id={id}
          packageName={imagesObj.tourTitle}
          price={imagesObj.price}
        ></BookingForm>
      </section>
    </CustomContainer>
  );
};

export default PackageDetails;
