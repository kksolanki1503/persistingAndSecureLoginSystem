import { useEffect, useState } from "react";
import axios from "../api/axios/axios";
import useAuth from "./useAuth";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const fpPromise = FingerprintJS.load();
  // let visitorId = null;
  // const [visitorId, setVisitorId] = useState(null);

  const refresh = async () => {
    try {
      fpPromise
        .then((fp) => fp.get())
        .then(async (result) => {
          // This is the visitor identifier:
          // visitorId = result.visitorId;
          // console.log(visitorId);
          // visitorId = result.visitorId;
          // setSignInData({ ...signInData, visitorId });
          // You can also inspect other details:
          // console.log(result.components);
          const response = await axios.post(
            "/api/auth/refresh",
            { visitorId: result.visitorId },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );

          setAuth((prev) => ({
            ...prev,
            roles: response.data.roles,
            accessToken: response.data.accessToken,
          }));
          return response.data.accessToken;
        });
    } catch (error) {
      console.error(error);
    }
  };
  return refresh;
};
export default useRefreshToken;
