import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./component/auth/signUp";
import Login from "./component/auth/login";
import HomePage from "./component/pages/homePage";
import PublicRoute from "./component/pages/publicRoute";
import PrivateRoute from "./component/pages/privateRoute";
// import PageList from "./component/pages/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./component/pages/notFound";
import Layout from "./component/pages/layout";
import NotAuthorized from "./component/pages/notAuthorized";
import RequireAuth from "./component/auth/requireAuth";
import PersistLogin from "./component/persistLogin";
function App() {
  const roles = {
    ADMIN: 100,
    DEVELOPER: 200,
  };
  return (
    <div>
      {/* df */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/publicroute" element={<PublicRoute />} />
            <Route path="/notauthorized" element={<NotAuthorized />} />
            <Route path="/" element={<HomePage />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />}>
                <Route path="/privateroute" element={<PrivateRoute />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
