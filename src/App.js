import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./component/auth/signUp";
import Login from "./component/auth/login";
import HomePage from "./component/pages/homePage";
import PublicRoute from "./component/pages/publicRoute";
import PrivateRoute from "./component/pages/privateRoute";
import PageList from "./component/pages/pageList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./component/pages/notFound";
function App() {
  // const myRoute = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <PageList />,
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/home",
  //     element: <HomePage />,
  //   },
  //   {
  //     path: "/privateroute",
  //     element: <PrivateRoute />,
  //   },
  //   {
  //     path: "/publicroute",
  //     element: <PublicRoute />,
  //   },
  // ]);
  return (
    // <div className="text-2xl">
    //   <RouterProvider router={myRoute} />
    //   <ToastContainer />
    // </div>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageList />}>
            {/* <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
