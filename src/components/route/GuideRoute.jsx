import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../shared/useAuth";
import CustomSpinner from "../shared/CustomSpinner";

const GuideRoute = ({ children }) => {
  const { roleLoading, userData } = useAuth();

  const location = useLocation();

  if (roleLoading) {
    return <CustomSpinner></CustomSpinner>;
  } else if (userData?.role === "guide") {
    return children;
  }

  return (
    <Navigate state={location.pathname} to="/dashboard/profile"></Navigate>
  );
};

GuideRoute.propTypes = {
  children: PropTypes.node,
};

export default GuideRoute;
