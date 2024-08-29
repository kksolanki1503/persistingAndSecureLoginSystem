import axios from "axios";
import { toast } from "react-toastify";

export async function signupApi(signUpData) {
  try {
    // setTimeout(() => {}, 1000);
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + `api/auth/signup`,
      signUpData,
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

export async function loginApi(loginData) {
  try {
    // setTimeout(() => {}, 1000);
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + `api/auth/signin`,
      loginData,
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

export async function getUserInfoApi() {
  try {
    // setTimeout(() => {}, 1000);
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL + `api/auth/getuserinfo`,
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
