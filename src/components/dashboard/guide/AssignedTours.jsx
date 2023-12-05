import CustomContainer from "../../shared/CustomContainer";
import CustomSpinner from "../../shared/CustomSpinner";
import Loader from "../../shared/Loader";
import useAuth from "../../shared/useAuth";
import useAxios from "../../shared/useAxios";
import TourTable from "./TourTable";

const AssignedTours = () => {
  const { user, handleAlert } = useAuth();
  const axiosSecure = useAxios();

  const { isLoading, data: bookings } = Loader(
    `/assigned-bookings?name=${user?.displayName}`,
    `${user?.displayName}`
  );

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  const handleAccept = (id) => {
    const status = {
      status: "Accept",
    };
    axiosSecure
      .put(`/assigned-bookings/${id}?email=${user?.email}`, status)
      .then((res) => {
        if (res.status === 201) {
          handleAlert("success", "Status Changed");
        }
      });
  };

  const handleReject = (id) => {
    const status = {
      status: "Reject",
    };
    axiosSecure
      .put(`/assigned-bookings/${id}?email=${user?.email}`, status)
      .then((res) => {
        if (res.status === 201) {
          handleAlert("success", "Status Changed");
        }
      });
  };

  return (
    <CustomContainer>
      <TourTable
        bookings={bookings}
        handleAccept={handleAccept}
        handleReject={handleReject}
      ></TourTable>
    </CustomContainer>
  );
};

export default AssignedTours;
