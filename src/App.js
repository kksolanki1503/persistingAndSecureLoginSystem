import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./component/auth/signUp";
import Login from "./component/auth/login";
import HomePage from "./component/pages/homePage";
function App() {
  const myRoute = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
  ]);
  return (
    <div className="text-2xl">
      <RouterProvider router={myRoute} />
      <ToastContainer />
    </div>
  );
}

export default App;
