import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // console.log("refresh Api is called");
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    // console.log(auth?.accessToken, "auth?.accessToken");
    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);
  return (
    <>{!persist ? <Outlet /> : loading ? <p>Loading...</p> : <Outlet />}</>
  );
};
export default PersistLogin;
