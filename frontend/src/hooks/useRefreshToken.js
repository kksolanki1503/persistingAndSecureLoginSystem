import { useEffect, useState } from "react";
import axios from "../api/axios/axios";
import useAuth from "./useAuth";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  // let visitorId = null;
  // const [visitorId, setVisitorId] = useState(null);

  const refresh = async () => {
    try {
      // const fpPromise = await FingerprintJS.load();
      // const result = await fpPromise.get();
      // const visitorId = result.visitorId;
      // console.log(result.components,"component")

      const response = await axios.get(
        "/api/auth/refresh",
        // { visitorId: visitorId },
        {
          withCredentials: true,
          // headers: { "Content-Type": "application/json" },
        }
      );
      // console.log(response, "refreshToken Response");
      setAuth((prev) => ({
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      }));
      // console.log("refresh Token verified and auth setted");
      return response.data.accessToken;
    } catch (error) {
      console.error(error);
    }
  };
  return refresh;
};
export default useRefreshToken;
