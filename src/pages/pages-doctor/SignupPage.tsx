import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/components-user/Footer';
import Navbar from '../../components/component-doctor/NavBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { auth, provider } from "../../../firebase/firebaseConfig";
import { signInWithPopup } from 'firebase/auth';
import SignUpFirst from '../../components/component-doctor/SignUpFirst';
import SignUpOtp from '../../components/component-doctor/SignUpOtp';




function SignupPage() {
  const navigate = useNavigate();

  const doctorData = useSelector(
    (state: any) => state.persisted.doctor.doctorData
  );
  useEffect(() => {
    if (doctorData._id) {
      navigate('/doctor/doctor-profile');
    }
  });

  const [stage, setStage] = useState<string>("first");

  function handleDataFromChild(data: string) {
    console.log("data from child for the confirmation of form submission--->", data, "<-- this is the data ");
    setStage(data);
  }



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
            setStage("success");
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
        setShowModal("false");
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

            {stage == "first" && <SignUpFirst sendDataToParent={handleDataFromChild} />
            }
            {stage == "otp" && <SignUpOtp sendDataToParent={handleDataFromChild} />
            }
            {stage == "success" && <><p>signup succesful !</p></>
            }

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
      {false && (
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

