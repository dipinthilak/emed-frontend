import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import UserManagement from '../../components/component-admin/UserManagement';
import Drawer from '../../components/component-admin/Drawer';
import Navbar from '../../components/component-admin/Navbar';
import Dashboard from '../../components/component-admin/Dashboard';
import DoctorManagement from '../../components/component-admin/DoctorManagement';
import DepartmentManagement from '../../components/component-admin/DepartmentManagement';
import { Toaster } from 'react-hot-toast';
import DoctorVerification from '../../components/component-admin/DoctorVerification';

function Home() {
    const navigate = useNavigate();
    const adminData = useSelector((state: any) => state.persisted.admin.adminData);

    useEffect(() => {
        if (!adminData._id) {
            navigate('/admin/login');
        }
    }, [adminData, navigate]);

    return (
        <>
      <Toaster position="top-right" reverseOrder={true}></Toaster>

            <Navbar />
            <div className="flex flex-row ">
                <Drawer />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/user-management" element={<UserManagement />} />
                        <Route path="/doctor-management" element={<DoctorManagement />} />
                        <Route path="/department-management" element={<DepartmentManagement />} />
                        <Route path="/doctor-verification" element={<DoctorVerification />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Home;
