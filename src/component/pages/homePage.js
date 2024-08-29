import { useEffect } from "react";
import { getUserInfoApi } from "../../api/auth/auth";

const HomePage = () => {
  useEffect(() => {
    const response = getUserInfoApi();
    console.log(response, "response in useEffect");
  }, []);

  return <div>HomePage</div>;
};
export default HomePage;
