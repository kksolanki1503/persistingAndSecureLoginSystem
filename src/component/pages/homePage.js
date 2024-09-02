import { useEffect } from "react";
import { getUserInfoApi } from "../../api/auth/auth";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fun = async () => {
      const response = await getUserInfoApi();
      if (response?.data?.code !== 200) {
        navigate("/");
      }
      console.log(response, "response in useEffect");
    };
    fun();
    return () => {};
  }, []);

  return <div>HomePage</div>;
};
export default HomePage;
