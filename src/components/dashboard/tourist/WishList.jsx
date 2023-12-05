import CustomContainer from "../../shared/CustomContainer";
import CustomSpinner from "../../shared/CustomSpinner";
import { headerClasses } from "../../shared/CustomText";
import Loader from "../../shared/Loader";
import useAuth from "../../shared/useAuth";
import useAxios from "../../shared/useAxios";
import WishTable from "./WishTable";

const WishList = () => {
  const { user, handleAlert } = useAuth();
  const axiosSecure = useAxios();

  const {
    isLoading,
    data: wishes,
    refetch,
  } = Loader(`/wishlist?email=${user?.email}`, `wishlist?email=${user?.email}`);

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  const handleDelete = (id) => {
    axiosSecure.delete(`/wishlist/${id}?email=${user?.email}`).then((res) => {
      if (res.status == 201) {
        handleAlert("success", "Package Deleted From Wishlist");
        refetch();
      }
    });
  };

  return (
    <CustomContainer>
      <h1 className={`${headerClasses}`}>Your Wish List</h1>
      <WishTable handleDelete={handleDelete} packages={wishes}></WishTable>
    </CustomContainer>
  );
};

export default WishList;
