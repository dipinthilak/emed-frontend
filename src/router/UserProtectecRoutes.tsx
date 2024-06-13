
import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

 

const UserProtectedRoute = () => {
  const userData = useSelector((state: any) =>
    state.persisted.user.userData)
  return userData._id ? <Outlet /> : <Navigate to="/login" />
}

export default UserProtectedRoute