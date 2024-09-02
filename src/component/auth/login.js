import { Link } from "react-router-dom";
import CustomInput from "../commonComponent/form/input/input";
import CustomButton from "../commonComponent/form/button/button";
import { useState } from "react";
import { loginApi } from "../../api/auth/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [signInData, setSignInData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };
  let response;

  async function handleSubmit(e) {
    e.preventDefault();
    async function loginApi() {
      try {
        // setTimeout(() => {}, 1000);
        const response = await axios.post(
          process.env.REACT_APP_BASE_URL + `api/auth/signin`,
          signInData,
          {
            withCredentials: true,
          }
        );
        if (response.data.code === 200) {
          toast.success(response.data.message);
          return response;
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response) toast.error(error.response.data.message);
        else toast.error(error.message);
      }
    }
    response = await loginApi();
    if (response?.data?.code === 200) {
      navigate("/home");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-2 border h-fit w-fit ">
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <CustomInput
            handleChange={handleChange}
            data={signInData}
            type="text"
            label="email"
            name="email"
            placeHolder="Enter email"
          />
          <CustomInput
            handleChange={handleChange}
            data={signInData}
            type="text"
            label="password"
            name="password"
            placeHolder="Enter password"
          />
          <Link
            to="/"
            className="flex justify-end w-full text-sm hover:text-blue-500"
          >
            Don't have account?
          </Link>
          <Link
            to="/forget"
            className="flex justify-end w-full text-sm hover:text-blue-500"
          >
            Forget Password ?
          </Link>
          <div className="flex items-center justify-center">
            <CustomButton handleSubmit={handleSubmit} title="sign In" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
