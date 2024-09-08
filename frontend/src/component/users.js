// import axios from "../api/axios/axios";
import { useEffect, useState } from "react";
// import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const GETALLUSERURL = "/api/auth/getAllUsers";
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(GETALLUSERURL, {
          signal: controller.signal,
        });
        // console.log(response);
        isMounted && setUsers(response.data.data);
      } catch (error) {
        console.error(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  //   console.log(users, "users");
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Users</h1>

      {users.length ? (
        users?.map((user) => <div>{user.name}</div>)
      ) : (
        <div>No user found</div>
      )}
    </div>
  );
};
export default Users;
