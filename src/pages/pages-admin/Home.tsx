import { useNavigate } from "react-router-dom";
import Dashboard from "../../components/component-admin/Dashboard"
import Drawer from "../../components/component-admin/Drawer"
import Navbar from "../../components/component-admin/Navbar"
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
    const adminData = useSelector(
        (state: any) => state.persisted.admin.adminData
    );
    useEffect(() => {
        if (!adminData._id) {
            navigate('/admin/login');
        }
    });
  return (
    <>
    <Navbar/>
    <div className="flex flex-row ">

    <Drawer/>
    <Dashboard/>
    </div>
    </>
  )
}

export default Home