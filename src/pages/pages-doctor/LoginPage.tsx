import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../../components/components-user/Footer';
import Navbar from '../../components/component-doctor/NavBar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor } from '../../rtk/slices/doctorSlice';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const doctorData = useSelector(
        (state: any) => state.persisted.doctor.doctorData
      );
      useEffect(()=>{
        if(doctorData.doctorId){
          navigate('/doctor-profile')
        }
      })

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("input datas", formData);
        axios.post(`http://localhost:3000/api/doctor/login`, { formData }, { withCredentials: true })
            .then(response => {
                console.log("response from server---->",response);
                
                const doctorData  = response.data.doctor;
                console.log("this is response from server----->>", doctorData);
                if (response.data.status) {
                    dispatch(addDoctor(doctorData));
                    navigate("/doctor-profile");
                }
            })
    };

    return (
        <>
            <Navbar />
            <div className="h-fit bg-blue-50 flex flex-col justify-center pt-32 pb-52 sm:px-4 lg:px-2">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 
                      rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                      focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 
                      rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                      focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm text-danger">
                                    <button type="button" onClick={() => navigate('/doctor/signup')} className="font-medium">
                                        Signup here
                                    </button>
                                </div>
                                <div className="text-sm text-danger">
                                    <a className="font-medium">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-secondary w-full flex justify-center py-2 px-4 border border-transparent 
                    rounded-md shadow-sm text-sm font-medium text-white"
                                >
                                    Log in
                                </button>
                            </div>
                        </form>
                        <div className="my-5">
                            <button
                                type="button"
                                className="btn btn-warning w-full flex justify-center py-2 px-4 border border-transparent 
                  rounded-md shadow-sm text-sm font-medium text-black"
                            >
                                Log in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LoginPage;
