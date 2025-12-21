
import { Navigate, useLocation } from "react-router";
import Useauth from "../Component/Useauth";

const PrivateRoute = ({ children }) => {
  const { User,loading } = Useauth();
  const location = useLocation();


  if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

  if (!User) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
