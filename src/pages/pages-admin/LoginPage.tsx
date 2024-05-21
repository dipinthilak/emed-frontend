import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/component-admin/Navbar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { addAdmin } from '../../rtk/slices/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
// const BaseUrl = import.meta.env.VITE_BaseUrl;


function LoginPage() {

    const navigate = useNavigate();
    const dispatch=useDispatch();

    const adminData = useSelector(
        (state: any) => state.persisted.admin.adminData
    );
    useEffect(() => {
        if (adminData._id) {
            navigate('/admin');
        }
    });
    const [adminName, setAdminName] = useState<string>('admin@medibuddy.com');
    const [password, setPassword] = useState<string>('123123');
    const handleAdminNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdminName(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("credentials", `Admin Name: ${adminName}, Password: ${password}`);
        axios.post(`http://localhost:3000/api/admin/login`, { email: adminName, password: password }, { withCredentials: true })
            .then((res) => {
                if (res.data.status) {
                    console.log(res)
                    const adminData=res.data.admin;
                        dispatch(addAdmin(adminData));
                        navigate("/admin");
                } else {
                    console.log("response from server",res.data?.message);
                }

            }).catch((error) => {
                console.log(error);
            })
    };


    return (
        <>
            <Navbar />

            <div className="h-[86vh] bg-green-50 flex flex-col justify-center pt-32 pb-52 sm:px-4 lg:px-2 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-0 text-center text-3xl font-extrabold text-teal-900">
                        ADMIN
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Admin name
                                </label>
                                <div className="mt-1">
                                    <input id="email" name="email" type="email" autoComplete="email" required
                                        value={adminName} onChange={handleAdminNameChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 
                                  rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                                  focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input id="password" name="password" type="password" autoComplete="current-password" required
                                        value={password} onChange={handlePasswordChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 
                                  rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                                  focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
                                </div>
                            </div>


                            <div>
                                <button type="submit" className=" btn btn-secondary w-full flex justify-center py-2 px-4 border border-transparent 
                                             rounded-md shadow-sm font-medium text-black text-xl 
                                            " >
                                    Log in
                                </button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage

