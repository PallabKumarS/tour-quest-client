import { useState } from "react";
import CustomContainer from "../../shared/CustomContainer";
import CustomSpinner from "../../shared/CustomSpinner";
import { headerClasses } from "../../shared/CustomText";
import Loader from "../../shared/Loader";
import useAuth from "../../shared/useAuth";
import useAxios from "../../shared/useAxios";
import BookingTable from "./BookingTable";
import PaymentModal from "../../shared/PaymentModal";

const BookingList = () => {
  const [selectedRowData, setSelectedRowData] = useState(null);

  const { user, handleAlert } = useAuth();
  const axiosSecure = useAxios();
  const {
    isLoading,
    data: bookings,
    refetch,
  } = Loader(`/bookings?email=${user.email}`, `bookings?email=${user.email}`);

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  let totalPrice = 0;

  const handleCancel = (tour) => {
    axiosSecure
      .delete(`/bookings/${tour?._id}?email=${user?.email}`)
      .then((res) => {
        if (res.status == 201) {
          handleAlert("success", "Booking Cancelled");
          refetch();
        }
      });
  };

  const handleApply = () => {};

  const handlePay = (tour) => {
    setSelectedRowData(tour);
  };

  return (
    <CustomContainer>
      <h1 className={`${headerClasses}`}>Bookings Are Listed Below</h1>
      <BookingTable
        bookings={bookings}
        handleApply={handleApply}
        handleCancel={handleCancel}
        totalPrice={totalPrice}
        handlePay={handlePay}
      ></BookingTable>
      {selectedRowData && (
        <PaymentModal
          setSelectedRowData={setSelectedRowData}
          rowData={selectedRowData}
          open={true}
          refetch={refetch}
        ></PaymentModal>
      )}
    </CustomContainer>
  );
};

export default BookingList;
