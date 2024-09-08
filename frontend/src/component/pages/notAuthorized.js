import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <>
      <div>NotAuthorized</div>
      <div className="cursor-pointer" onClick={goBack}>
        Go Back
      </div>
    </>
  );
};
export default NotAuthorized;
