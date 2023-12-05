import CustomContainer from "../../shared/CustomContainer";
import CustomSpinner from "../../shared/CustomSpinner";
import Loader from "../../shared/Loader";
import useAuth from "../../shared/useAuth";
import useAxios from "../../shared/useAxios";
import UserTable from "./UserTable";

const ManageUsers = () => {
  const axiosSecure = useAxios();
  const { handleAlert, user: mainUser, loading } = useAuth();
  const { isLoading, data: users, refetch } = Loader(`/users`, "users");

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  } else if (loading) {
    return <CustomSpinner></CustomSpinner>;
  }

  const handleMakeAdmin = (email) => {
    const user = {
      role: "admin",
    };
    axiosSecure
      .put(`/users?email=${mainUser?.email}&userEmail=${email}`, user)
      .then((res) => {
        if (res.status === 201) {
          handleAlert("success", "User Role Changed Successfully");
          refetch();
        }
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };

  const handleMakeGuide = (email) => {
    const user = {
      role: "guide",
    };
    axiosSecure
      .put(`/users?email=${mainUser?.email}&userEmail=${email}`, user)
      .then((res) => {
        if (res.status === 201) {
          handleAlert("success", "User Role Changed Successfully");
          refetch();
        }
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };

  return (
    <CustomContainer className={`mt-20`}>
      <div className="text-center">
        <UserTable
          users={users}
          admin={handleMakeAdmin}
          guide={handleMakeGuide}
        ></UserTable>
      </div>
    </CustomContainer>
  );
};

export default ManageUsers;
