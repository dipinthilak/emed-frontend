import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/components-user/Footer';
import Navbar from '../../components/component-doctor/NavBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { auth, provider } from "../../../firebase/firebaseConfig";
import { signInWithPopup } from 'firebase/auth';


const calculateMaxDate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 23);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function SignupPage() {
  const navigate = useNavigate();
  const maxDate = calculateMaxDate();


  const doctorData = useSelector(
    (state: any) => state.persisted.doctor.doctorData
  );
  useEffect(() => {
    if (doctorData._id) {
      navigate('/doctor/doctor-profile');
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const initialValues = {
    fullName: '',
    email: '',
    registerNo: '',
    department: '',
    address: '',
    pincode: '',
    phoneNo: '',
    gender: '',
    dob: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    registerNo: Yup.string().required('Register No is required'),
    department: Yup.string().required('Department is required'),
    address: Yup.string().required('Address is required'),
    pincode: Yup.string().required('Pincode is required'),
    phoneNo: Yup.string().min(10, 'Enter valid Phone number').required('Phone No is required'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.date().max(new Date(maxDate), 'You must be at least 23 years old').required('Date of Birth is required').nullable(),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    axios.post(`http://localhost:3000/api/doctor/signup`, { formData: values }, { withCredentials: true })
      .then(response => {
        if (response.data.status) {
          setShowModal(true);
        }
      })
      .catch(error => {
        console.error('Signup failed:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleOTPSubmit = () => {
    axios.post(`http://localhost:3000/api/doctor/verify-otp`, { otpValue: parseInt(otpValue) }, { withCredentials: true })
      .then(response => {
        console.log(response);

        if (response.data.verification) {
          setSignUpSuccess(true);
        } else {
          alert("Enter OTP again");
          setShowModal(true);
        }
      })
      .catch(error => {
        console.error('OTP verification failed:', error);
      });
    setShowModal(false);
  };


  const handleGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      console.log("google data---->", data);

      const userData = {
        email: data.user.email,
        fullName: data.user.displayName,
        googleId: data.user.uid,
        phoneNo: data.user.phoneNumber ?? null,
        isGoogle: true,
      };

      axios
        .post(`http://localhost:3000/api/doctor/google-signup`, userData, { withCredentials: true })
        .then((response) => {
          console.log("res");
          console.log(response);
          if (response.data.status) {
            setSignUpSuccess(true);
          } else {
            toast.error("signup with google account is not succesfull!");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Sign in with Google failed!");
        });
    } catch (error) {
      console.log(error);
      toast.error("Sign in with Google failed!");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (modalRef.current && target && !modalRef.current.contains(target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={true}></Toaster>
      <div className="flex justify-center items-center w-full mt-8 bg-white px-5 py-5">
        <div className="xl:max-w-7xl pb-60 bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
          <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-secondary">
              Create Account
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="w-full mt-5 sm:mt-8">
                    <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                      <div>
                        <Field
                          type="text"
                          name="fullName"
                          placeholder="Enter Your Full Name"
                          className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                        />
                        <ErrorMessage name="fullName" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="email"
                          placeholder="Enter Your Email"
                          className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="registerNo"
                          placeholder="Enter Your Register No"
                          className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                        />
                        <ErrorMessage name="registerNo" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="department"
                          placeholder="Enter Your Department"
                          className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                        />
                        <ErrorMessage name="department" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <Field
                          as="textarea"
                          name="address"
                          placeholder="Enter Your Address"
                          className="input input-bordered input-primary w-full h-20 text-black placeholder:text-black/70"
                        />
                        <ErrorMessage name="address" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="pincode"
                          placeholder="Enter Your Pincode"
                          className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                        />
                        <ErrorMessage name="pincode" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="phoneNo"
                          placeholder="Enter Your Phone No"
                          className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                        />
                        <ErrorMessage name="phoneNo" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <Field
                          as="select"
                          name="gender"
                          className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                        >
                          <option value="">Select your Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Field>
                        <ErrorMessage name="gender" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <Field
                          type="date"
                          name="dob"
                          placeholder="Enter Your Date of Birth"
                          className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                          max={maxDate}
                        />
                        <ErrorMessage name="dob" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <Field
                          type="password"
                          name="password"
                          placeholder="Enter Your Password"
                          className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-600" />
                      </div>
                      <div>
                        <Field
                          type="password"
                          name="confirmPassword"
                          placeholder="Re-enter Your Password"
                          className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                        />
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
                      </div>
                      <button type="submit" className="btn btn-secondary text-xl font-medium w-full" disabled={isSubmitting}>
                        SIGNUP
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="mt-8 flex items-center space-x-2 justify-center px-3">
              <button
                className="btn btn-warning w-full flex justify-center py-2 px-4  border border-transparent 
                                              rounded-md shadow-sm text-xl font-medium text-black"
                onClick={handleGoogle}
              >
                SIGNUP WITH GOOGLE
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={modalRef} className="bg-white p-8 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
            <input
              type="text"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              placeholder="Enter OTP"
              className="input input-bordered input-primary w-full mb-4"
            />
            <button onClick={handleOTPSubmit} className="btn btn-primary w-full">Submit</button>
          </div>
        </div>
      )}
      {signUpSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-md text-center">
            <h2 className="text-xl font-bold mb-4 text-orange-600 ">Sign Up Successful</h2>
            <p className='text-gray-500'>Your account has been created successfully.</p>
            <button onClick={() => navigate('/doctor/login')} className="btn btn-secondary mt-4 text-gray-500">Go to Sign In</button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignupPage;


