import Users from "../users";
import useLogout from "../../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const signOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div>
      <button
        className="block p-2 m-2 font-bold tracking-wider border rounded hover:bg-blue-700 hover:text-white"
        onClick={signOut}
      >
        LogOut
      </button>
      PrivateRoute
      <Users />
    </div>
  );
};
export default PrivateRoute;
