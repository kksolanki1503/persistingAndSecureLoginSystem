import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  // console.log("require Auth is wokring");
  console.log(
    auth?.roles?.find((role) => allowedRoles.includes(role)),
    "auth condition"
  );
  return auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to={"/notauthorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
export default RequireAuth;
