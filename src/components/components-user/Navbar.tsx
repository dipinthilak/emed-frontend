import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearUser } from "../../rtk/slices/userSlice";
import axios from "axios";
function Navbar() {
  // const BaseUrl=import.meta.env.VITE_BaseUrl;
  const BaseUrl:string = `http://localhost:3000/api/`;
  const path = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: any) => state.persisted.user.userData
  );
  useEffect(() => {
    console.log(BaseUrl);
    console.log(userData);
    console.log(path.pathname);
  }, []
  )

  const handleLogout = () => {
    console.log("base url-------> ",BaseUrl);
    
    axios.get(`${BaseUrl}user/logout`, { withCredentials: true })
      .then(response => {
        console.log(response);
        dispatch(clearUser());
        navigate("/login");
      })
  }
  return (
    <>
      <div className="navbar bg-primary w-full h-28 tracking-widest font-black font-mono text-base-100">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] text-blue-500 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>PLANS</a>
              </li>
              <li>
                <a>BLOGS</a>
              </li>
              <li onClick={() => navigate("/about")}>
                <a>ABOUT US</a>
              </li>
              <li onClick={() => navigate("/contact")}>
                <a>CONATCT US</a>
              </li>
            </ul>
          </div>
          <a
            className="btn  btn-primary text-white  text-4xl"
            onClick={() => navigate("/")}
          >
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
            <li onClick={() => navigate("/about")}>
              <a>ABOUT US</a>
            </li>
            <li onClick={() => navigate("/contact")}>
              <a>CONATCT US</a>
            </li>
          </ul>
        </div>
        {!userData._id ? (
          <div className="navbar-end pr-10 ">
            {path.pathname !== "/login" && <a
              className="btn mx-10  btn-primary text-white text-2xl"
              onClick={() => navigate("/login")}
            >
              Signin
            </a>}
            {path.pathname !== "/signup" && <a
              className="btn btn-primary  text-white text-2xl"
              onClick={() => navigate("/signup")}
            >
              Signup
            </a>}
          </div>
        ) : (
          <div className="navbar-end pr-10 ">

            <a
              className="btn btn-primary  text-white text-2xl"
              onClick={() => navigate("/user-profile")}
            >
              {userData.fullName}
            </a>
            <a
              className="btn mx-10  btn-primary text-white text-2xl"
              onClick={

                () => handleLogout()}
            >
              Logout
            </a>
          </div>
        )}
      </div >
    </>
  );
}

export default Navbar;
