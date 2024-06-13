
import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

const AdminProtectedRoute = () => {
  const adminData = useSelector((state: any) =>
    state.persisted.admin.adminData)
  return adminData._id ? <Outlet /> : <Navigate to="/admin/login" />
}

export default AdminProtectedRoute