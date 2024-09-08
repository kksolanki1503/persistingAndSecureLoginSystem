import { useEffect, useRef, useState } from "react";
import CustomInput from "../commonComponent/form/input/input";
import CustomButton from "../commonComponent/form/button/button";
import { Link } from "react-router-dom";
import axios from "../../api/axios/axios";
import { toast } from "react-toastify";
const SignUp = () => {
  const [signupData, setsignupData] = useState({});
  const nameRef = useRef();
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  // const [nameFoucs, setNameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  // const []

  const [matchpassword, setMatchPassword] = useState("");
  const [matchvalidPassword, setMatchValidPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (signupData.password) setPassword(signupData.password);
    if (signupData.matchPassword) setMatchPassword(signupData.matchPassword);
    if (signupData.email) setEmail(signupData.email);
    if (signupData.name) setName(signupData.name);
  }, [signupData]);

  const PASSWORD_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const SIGNUP_API = "api/auth/signup";
  const handleChange = (e) => {
    setsignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = name.length > 3;
    setValidName(result);
  });
  // console.log(validEmail, "validEmail");
  // console.log(email, "email");

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchpassword && matchpassword.length > 0;
    setMatchValidPassword(match);
  }, [password, matchpassword]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchpassword]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(SIGNUP_API, signupData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.code === 200) {
        toast.success(response.data.message);
        return response;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error("No Server Response");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-2 border h-fit w-fit ">
        <h1 className="text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <CustomInput
            handleChange={handleChange}
            data={signupData}
            type="text"
            label="name"
            reference={nameRef}
            name="name"
            placeHolder="Enter Name"
            valid={validName}
          />
          <CustomInput
            handleChange={handleChange}
            data={signupData}
            type="text"
            label="email"
            valid={validEmail}
            name="email"
            placeHolder="Enter email"
            errorMessage={false}
          />
          <CustomInput
            handleChange={handleChange}
            data={signupData}
            type="text"
            label="password"
            valid={validPassword}
            name="password"
            placeHolder="Enter password"
          />
          <CustomInput
            handleChange={handleChange}
            data={signupData}
            type="text"
            label="Conform password"
            valid={matchvalidPassword}
            name="matchPassword"
            placeHolder="Enter Conform password"
          />

          <Link
            to="/login"
            className="flex justify-end w-full text-sm hover:text-blue-500"
          >
            Alredy have an account?
          </Link>

          <div className="flex items-center justify-center">
            <CustomButton handleSubmit={handleSubmit} title="sign up" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
