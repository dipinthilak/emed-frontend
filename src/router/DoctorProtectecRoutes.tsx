import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


const DoctorProtectedRoute = () => {
  const doctorData = useSelector((state: any) =>
    state.persisted.doctor.doctorData)
  return doctorData._id ? <Outlet /> : <Navigate to="/doctor/login" />
}

export default DoctorProtectedRoute