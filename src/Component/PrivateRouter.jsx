
import { Navigate, useLocation } from "react-router";
import Useauth from "../Component/Useauth";

const PrivateRoute = ({ children }) => {
  const { User } = Useauth();
  const location = useLocation();

  if (!User) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
