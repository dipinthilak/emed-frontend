import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/components-user/Footer';
import Navbar from '../../components/components-user/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const calculateMaxDate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function SignupPage() {
  const navigate = useNavigate();
  const maxDate = calculateMaxDate();

  const userData = useSelector((state: any) => state.persisted.user.userData);

  useEffect(() => {
    if (userData.userId) {
      navigate('/user-profile');
    }
  }, [userData, navigate]);

  const [showModal, setShowModal] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const initialValues = {
    fullName: '',
    email: '',
    address: '',
    phoneNo: '',
    password: '',
    gender: '',
    dob: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    address: Yup.string().required('Required'),
    phoneNo: Yup.string().min(10, 'Enter valid Phone number').required('Required'),
    gender: Yup.string().required('Required'),
    dob: Yup.date().max(new Date(maxDate), 'You must be at least 18 years old').required('Required').nullable(),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Required')
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log("signup form -------------------------");

    axios.post(`http://localhost:3000/api/user/signup`, { formData: values }, { withCredentials: true })
      .then(response => {
        console.log(response.data);
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
    console.log("otp user entered---->>   ",otpValue);
    
    axios.post(`http://localhost:3000/api/user/verify-otp`, { otpValue: parseInt(otpValue) }, { withCredentials: true })
      .then(response => {
        console.log("response from server------->>",response);
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
      <div className="flex justify-center items-center w-full mt-8 bg-white px-5 py-5">
        <div className="xl:max-w-7xl pb-60 bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
          <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-primary">
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
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center m-12">
                        <button type="submit" className="btn btn-active btn-primary btn-block max-w-[200px] text-white text-xl" disabled={isSubmitting}>
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md" ref={modalRef}>
            <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
            <input
              type="number"
              className="input input-bordered mb-4"
              placeholder="Enter OTP"
              onChange={(e) => setOtpValue(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleOTPSubmit}>
              Submit OTP
            </button>
          </div>
        </div>
      )}
      {signUpSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md" ref={modalRef}>
            <h2 className="text-xl font-semibold mb-4">Signup Success</h2>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>
              LOGIN Here
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default SignupPage;
