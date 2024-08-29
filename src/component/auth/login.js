import { Link } from "react-router-dom";
import CustomInput from "../commonComponent/form/input/input";
import CustomButton from "../commonComponent/form/button/button";
import { useState } from "react";
import { loginApi } from "../../api/auth/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [signInData, setSignInData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };
  let response;
  async function handleSubmit(e) {
    e.preventDefault();
    response = await loginApi(signInData);
    if (response?.data?.code === 200) {
      navigate("/home");
    }
  }

  return (
    <div className="min-h-screen  flex justify-center items-center">
      <div className="border p-2 h-fit w-fit ">
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
            className="text-sm w-full  flex justify-end hover:text-blue-500"
          >
            Don't have account?
          </Link>
          <Link
            to="/forget"
            className="text-sm w-full  flex justify-end hover:text-blue-500"
          >
            Forget Password ?
          </Link>

          <div className="flex justify-center items-center">
            <CustomButton handleSubmit={handleSubmit} title="sign In" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
