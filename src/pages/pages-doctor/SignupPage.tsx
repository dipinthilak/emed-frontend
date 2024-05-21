import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Footer from '../../components/components-user/Footer';
import Navbar from '../../components/component-doctor/NavBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SignupPage() {
  const navigate = useNavigate();

  const doctorData = useSelector(
    (state: any) => state.persisted.doctor.doctorData
  );
  useEffect(()=>{
    if(doctorData.doctorId){
      navigate('/doctor-profile')
    }
  })

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    registerNo:'',
    department:'',
    address: '',
    pincode:'',
    phoneNo: '',
    gender:'',
    dob:'',
    password: '',
    confirmPassword: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const modalRef = useRef(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log();

    axios.post(`http://localhost:3000/api/doctor/signup`, { formData }, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        console.log(response.data.message);
        if (response.data.status) {
          setShowModal(true);
        }
      })
      .catch(error => {
        console.error('Signup failed:', error);
      });
  };

  const handleOTPSubmit = () => {
    axios.post(`http://localhost:3000/api/doctor/verify-otp`, { otpValue: parseInt(otpValue) }, { withCredentials: true })
      .then(response => {
        console.log(response.data.message);
        if (response.data.status) {
          setSignUpSuccess(true);
        }
        else if (!response.data.status) {
          alert("enter otp again-----")
          setShowModal(true);
        }
      })
    console.log("Submitting OTP:", otpValue);
    setShowModal(false);
  };

  useEffect(() => {
    // Add event listener to prevent modal close when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 23);



  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center w-full  mt-8 bg-white px-5 py-5">
        <div className="xl:max-w-7xl pb-60 bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
          <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-secondary">
              Create Account
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="w-full mt-5 sm:mt-8">
                <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter Your Full Name"
                    className="input input-bordered input-secondary w-full text-black placeholder:text-black/70"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    className="input input-bordered input-secondary w-full text-black placeholder:text-black/70"
                  />
                                    <input
                    type="text"
                    name="registerNo"
                    required
                    value={formData.registerNo}
                    onChange={handleChange}
                    placeholder="Enter Your registerNo"
                    className="input input-bordered input-secondary w-full text-black placeholder:text-black/70"
                  />
                                    <input
                    type="text"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter Your department"
                    className="input input-bordered input-secondary w-full text-black placeholder:text-black/70"
                  />
                  <input
                    type="textarea"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Your Address"
                    className="input input-bordered input-secondary w-full h-20 text-black placeholder:text-black/70"
                  />
                                    <input
                    type="textarea"
                    required
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter Your pincode"
                    className="input input-bordered input-secondary w-full h-20 text-black placeholder:text-black/70"
                  />
                  <input
                    type="text"
                    name="phoneNo"
                    required
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder="Enter Your Phone No"
                    className="input input-bordered input-secondary w-full text-black placeholder:text-black/70"
                  />
                  <select
                    name="gender"
                    value={formData.gender}
                    required
                    onChange={handleChange}
                    className="input input-bordered input-secondary w-full text-black placeholder:text-black/70"
                  >
                    <option value="" >Select your Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder="Enter Your Date of Birth"
                    className="input input-bordered input-secondary w-full text-black placeholder:text-black/70"
                    max={maxDate.toISOString().split('T')[0]} 

                  />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    className="input input-bordered input-secondary w-full text-black placeholder:text-black/70"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter Your Password"
                    className="input input-bordered input-secondary w-full text-black placeholder:text-black/70"
                  />
                  <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center m-12">
                    <button type="submit" className="btn btn-active btn-secondary btn-block max-w-[200px] text-white text-xl">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md" ref={modalRef}>
            <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
            <input type="number" className="input input-bordered mb-4" placeholder="Enter OTP" onChange={(e) => setOtpValue(e.target.value)} />
            <button className="btn btn-primary" onClick={() => handleOTPSubmit()}>Submit OTP</button>
          </div>
        </div>
      )}
      {signUpSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md" ref={modalRef}>
            <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
            <p>Signup Success </p>
            <button className="btn btn-primary" onClick={() => navigate("/doctor/login")}>LOGIN Here</button>
          </div>
        </div>
      )}


      <Footer />
    </>
  );
}

export default SignupPage;
