import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../../components/components-user/Footer';
import Navbar from '../../components/components-user/Navbar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../rtk/slices/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase/firebaseConfig';
import toast, { Toaster } from 'react-hot-toast';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userData = useSelector(
    (state: any) => state.persisted.user.userData
  );

  useEffect(() => {
    if (userData._id) {
      navigate('/user-profile')
    }
  })
  const [formData, setFormData] = useState({
    email: 'dipint2023@gmail.com',
    password: '123123'
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
    axios.post(`http://localhost:3000/api/user/login`, { formData }, { withCredentials: true })
      .then(response => {
        if (response.data.status) {
          console.log("response from server ---->>>", response);
          dispatch(addUser(response.data.user));
          navigate("/user-profile");
        }
        if (!response.data.status) {
          console.log("credentials not correct !");
          
          console.log("res data -------->>>", response.data?.message)
        toast.error(response.data.message);
        }
      })
      .catch((er) => {
        toast.error(`${er.data.message}`);
        // toast.success("Password updated successfully.");


        if (er.response) {
          // toast.error()
          // if(er.response.data.message){
          // setToast(er.response)
        }

      })
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
        .post(`http://localhost:3000/api/user/google-login`, userData, { withCredentials: true })
        .then((response) => {
          console.log("response from server---->", response.data.doctor);
          if (response.data.status) {
            const userData = response.data.user;
            dispatch(addUser(userData));
            navigate("/doctor-profile");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <Navbar />
      <Toaster position="top-right" reverseOrder={true}></Toaster>


      {/* {toast && <div role="alert" className="bg-red-500 mt-2 alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! {toast}</span>
      </div>} */}

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
                  <button type="button" onClick={() => navigate('/signup')} className="font-medium">
                    Signup here
                  </button>
                </div>
                <div className="text-sm text-danger">
                <a className="font-medium" onClick={() => { navigate('/user/forgot-password') }}>
                                        Forgot your password?
                                    </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-primary w-full flex justify-center py-2 px-4 border border-transparent 
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
                onClick={handleGoogle}
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
