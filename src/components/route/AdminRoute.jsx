import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../shared/useAuth";
import CustomSpinner from "../shared/CustomSpinner";

const AdminRoute = ({ children }) => {
  const { roleLoading, userData } = useAuth();

  const location = useLocation();

  if (roleLoading) {
    return <CustomSpinner></CustomSpinner>;
  } else if (userData?.role === "admin") {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
