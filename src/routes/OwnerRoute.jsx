import { Navigate, useLocation } from "react-router-dom";
import useOwner from "../hooks/useOwner";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const OwnerRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  const [isOwner, isOwnerLoading] = useOwner();

  if (loading || isOwnerLoading) {
    return (
      <>
        <progress className="progress"></progress>
      </>
    );
  }
  if (user && isOwner) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default OwnerRoute;
