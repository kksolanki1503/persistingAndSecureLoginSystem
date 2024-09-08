import axios from "../api/axios/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios("/api/auth/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error, "error");
    }
  };
  return logout;
};
export default useLogout;
