import CustomContainer from "../../shared/CustomContainer";
import CustomSpinner from "../../shared/CustomSpinner";
import { headerClasses } from "../../shared/CustomText";
import Loader from "../../shared/Loader";
import useAuth from "../../shared/useAuth";
import BookingTable from "./BookingTable";

const BookingList = () => {
  const { user } = useAuth();
  const { isLoading, data: bookings } = Loader(
    `/bookings?email=${user.email}`,
    `bookings?email=${user.email}`
  );

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  const handleCancel = () => {};

  const handlePay = () => {};

  const handleApply = () => {};

  return (
    <CustomContainer>
      <h1 className={`${headerClasses}`}>Bookings Are Listed Below</h1>
      <BookingTable
        bookings={bookings}
        handleApply={handleApply}
        handleCancel={handleCancel}
        handlePay={handlePay}
      ></BookingTable>
    </CustomContainer>
  );
};

export default BookingList;
