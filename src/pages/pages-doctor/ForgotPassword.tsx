import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/components-user/Footer';
import Navbar from '../../components/component-doctor/NavBar';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

const ForgotPasswordPage = () => {

    const doctorData = useSelector(
        (state: any) => state.persisted.doctor.doctorData
    );
    useEffect(() => {
        if (doctorData._id) {
            navigate('/doctor/doctor-profile');
        }
    });
    const navigate = useNavigate();
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [showForgot, setShowForgot] = useState(true);

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const handleSubmit = (values: { email: string; password: string; otp?: string }) => {
        if (showForgot) {
            axios.post('http://localhost:3000/api/doctor/forgot-password', { email: values.email, password: values.password }, { withCredentials: true })
                .then(response => {
                    if (response.data.status) {
                        toast.success("Password reset link sent to your email.");
                        setShowForgot(false);
                    }
                })
                .catch(error => {
                    console.error("Error sending password reset link:", error);
                    toast.error("Failed to send password reset link. Please try again.");
                });
        } else {
            axios.post('http://localhost:3000/api/doctor/verify-forgototp', { email: values.email, otp: values.otp, }, { withCredentials: true })
                .then(response => {
                    if (response.data.status) {
                        toast.success("Password updated successfully.");
                        setSignUpSuccess(true);
                    }
                    else {
                        toast.error("Enter correct otp ");
                    }
                })
                .catch(error => {
                    console.error("Error verifying OTP or updating password:", error);
                    toast.error("Failed to update password. Please try again.");
                });
        }
    };

    return (
        <>
            <Navbar />
            <Toaster position="top-right" reverseOrder={true}></Toaster>
            <div className="h-fit bg-blue-50 flex flex-col justify-center pt-32 pb-52 sm:px-4 lg:px-2">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900">
                        {showForgot ? "Forgot Password" : "Enter OTP"}
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            context={{ showForgot }}
                        >
                            <Form className="space-y-6">


                                {showForgot && (
                                    <>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                EMAIL
                                            </label>
                                            <div className="mt-1">
                                                <Field
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 
                                                  rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                                                  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                NEW PASSWORD
                                            </label>
                                            <div className="mt-1">
                                                <Field
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    required
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 
                                                          rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                                                          focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                                CONFIRM PASSWORD
                                            </label>
                                            <div className="mt-1">
                                                <Field
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    required
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 
                                                          rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                                                          focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>
                                    </>
                                )}
                                {!showForgot && (
                                    <>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                EMAIL
                                            </label>
                                            <div className="mt-1">
                                                <Field
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    readonly
                                                    required
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 
                                                                                      rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                                                                                      focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                                OTP
                                            </label>
                                            <div className="mt-1">
                                                <Field
                                                    id="otp"
                                                    name="otp"
                                                    type="text"
                                                    required
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 
                                                      rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                                                      focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        </>
                                )}
                                        <div>
                                            <button
                                                type="submit"
                                                className="btn btn-secondary w-full flex justify-center py-2 px-4 border text-xl border-transparent 
                                                rounded-md shadow-sm font-medium text-white"
                                            >
                                                {showForgot ? "SEND OTP" : "UPDATE PASSWORD"}
                                            </button>
                                        </div>
                                    </Form>

                        </Formik>
                    </div>
                </div>
            </div>
            {signUpSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-md text-center">
                        <h2 className="text-xl font-bold mb-4 text-orange-600 ">Password Upadation Successful</h2>
                        <p className='text-gray-500'>Your account password has been updated successfully.</p>
                        <button onClick={() => navigate('/doctor/login')} className="btn btn-secondary mt-4 text-xl text-black">Go to Sign In</button>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default ForgotPasswordPage;
