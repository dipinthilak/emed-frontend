import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearDoctor } from "../../rtk/slices/doctorSlice";
import axios from "axios";

function Navbar() {
  const BaseUrl: string = `http://localhost:3000/api/`;
  const path = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doctorData = useSelector(
    (state: any) => state.persisted.doctor.doctorData
  );

  useEffect(() => {
    console.log(doctorData);
    console.log(path.pathname);
  }, []);

  const handleLogout = () => {
    console.log("base url-------> ", BaseUrl);

    axios.get(`${BaseUrl}doctor/logout`, { withCredentials: true }).then((response) => {
      console.log(response);
      dispatch(clearDoctor());
      navigate("/doctor/login");
    });
  };

  return (
    <>
      <div className="navbar bg-secondary w-full h-28 tracking-widest font-black font-mono text-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] text-green-500 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>PLANS</a>
              </li>
              <li>
                <a>BLOGS</a>
              </li>
              <li>
                <a>ABOUT US</a>
              </li>
              <li>
                <a>CONTACT US</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-secondary text-white text-4xl" onClick={() => navigate("/")}>
            E-MED
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-2xl">
            <li>
              <a>PLANS</a>
            </li>
            <li>
              <a>BLOGS</a>
            </li>
            <li onClick={() => navigate("/doctor/about")}>
              <a>ABOUT US</a>
            </li>
            <li onClick={() => navigate("/doctor/contact")}>
              <a>CONTACT US</a>
            </li>
          </ul>
        </div>
        {!doctorData.doctorId ? (
          <div className="navbar-end pr-10 ">
            {path.pathname !== "/doctor/login" && (
              <a
                className="btn mx-10 btn-secondary text-white text-2xl"
                onClick={() => navigate("/doctor/login")}
              >
                Signin
              </a>
            )}
            {path.pathname !== "/doctor/signup" && (
              <a
                className="btn btn-secondary text-white text-2xl"
                onClick={() => navigate("/doctor/signup")}
              >
                Signup
              </a>
            )}
          </div>
        ) : (
          <div className="navbar-end pr-10 ">
            <a
              className="btn btn-secondary text-white text-2xl"
              onClick={() => navigate("/doctor-profile")}
            >
              {doctorData.name}
            </a>
            <a
              className="btn mx-10 btn-secondary text-white text-2xl"
              onClick={() => handleLogout()}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
