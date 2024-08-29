import { useState } from "react";
import CustomInput from "../commonComponent/form/input/input";
import CustomButton from "../commonComponent/form/button/button";

import { Link } from "react-router-dom";
import { signupApi } from "../../api/auth/auth";

const SignUp = () => {
  const [loginData, setLoginData] = useState({});

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    signupApi(loginData);
  }
  return (
    <div className="min-h-screen  flex justify-center items-center">
      <div className="border p-2 h-fit w-fit ">
        <h1 className="text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <CustomInput
            handleChange={handleChange}
            data={loginData}
            type="text"
            label="name"
            name="name"
            placeHolder="Enter Name"
          />
          <CustomInput
            handleChange={handleChange}
            data={loginData}
            type="text"
            label="email"
            name="email"
            placeHolder="Enter email"
          />
          <CustomInput
            handleChange={handleChange}
            data={loginData}
            type="text"
            label="password"
            name="password"
            placeHolder="Enter password"
          />

          <Link
            to="/login"
            className="text-sm w-full  flex justify-end hover:text-blue-500"
          >
            Alredy have an account?
          </Link>

          <div className="flex justify-center items-center">
            <CustomButton handleSubmit={handleSubmit} title="sign up" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
