import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import CustomSpinner from "../shared/CustomSpinner";
import useAuth from "../shared/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <CustomSpinner></CustomSpinner>;
  } else if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
