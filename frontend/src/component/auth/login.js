import { Link } from "react-router-dom";
import CustomInput from "../commonComponent/form/input/input";
import CustomButton from "../commonComponent/form/button/button";
import { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";
// import FingerprintJS from "@fingerprintjs/fingerprintjs";
// import AuthContext from "../../context/authProvider";
// import axios from "axios";
import { toast } from "react-toastify";
import axios from "../../api/axios/axios";
import useAuth from "../../hooks/useAuth";
import CheckBox from "../commonComponent/form/checkBox/checkBox";
// import Bowser from "bowser";
const Login = () => {
  // const browser = Bowser.getParser(window.navigator.userAgent);
  // console.log(`The current browser name is "${browser}"`);
  // console.log(browser);
  const LOGIN_API = "api/auth/signin";
  const [signInData, setSignInData] = useState({});
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  // const fpPromise = FingerprintJS.load();
  // const visitorId = null;

  // useEffect(() => {
  //   fpPromise
  //     .then((fp) => fp.get())
  //     .then((result) => {
  //       // This is the visitor identifier:
  //       const visitorId = result.visitorId;
  //       console.log(visitorId);
  //       setSignInData({ ...signInData, visitorId });
  //       // You can also inspect other details:
  //       // console.log(result.components);
  //     });
  // }, []);
  // console.log(signInData, "signindata");
  // console.log(location?.state?.from?.pathname, "location");
  const focusRef = useRef();

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const PASSWORD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleCheckBox = () => {
    setPersist((prev) => !prev);
  };

  const handleChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };
  let response;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // setTimeout(() => {}, 1000);
      const response = await axios.post(LOGIN_API, signInData, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email: signInData?.email, accessToken, roles });
      toast(response?.data?.message);
      navigate(from, { replace: true });
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error(error.message);
    }
  }
  // console.log(persist, "persist");
  useEffect(() => {
    focusRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  });
  useEffect(() => {
    if (signInData.password) setPassword(signInData.password);
    if (signInData.email) setEmail(signInData.email);
  }, [signInData]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-2 border h-fit w-fit ">
        <h1 className="text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <CustomInput
            handleChange={handleChange}
            data={signInData}
            type="text"
            reference={focusRef}
            valid={validEmail}
            label="email"
            name="email"
            placeHolder="Enter email"
          />
          <CustomInput
            handleChange={handleChange}
            data={signInData}
            type="text"
            label="password"
            valid={validPassword}
            name="password"
            placeHolder="Enter password"
          />
          <Link
            to="/signup"
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
          <div className="">
            <CheckBox
              handleCheckBox={handleCheckBox}
              value={persist}
              title={"Remember me"}
            />
          </div>
          <div className="flex items-center justify-center">
            <CustomButton handleSubmit={handleSubmit} title="sign In" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
