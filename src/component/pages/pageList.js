import { Link } from "react-router-dom";

const PageList = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <h1>Page List</h1>
      <ul className="my-2 text-base text-center ">
        <li className="hover:text-[#3e70d3]">
          <Link to={"/publicroute"}>Public Route</Link>
        </li>
        <li>
          <Link to={"/privateroute"}>Private Route</Link>
        </li>
      </ul>
    </div>
  );
};
export default PageList;
