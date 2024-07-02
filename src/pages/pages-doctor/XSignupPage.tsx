import { ChangeEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/components-user/Footer';
import Navbar from '../../components/component-doctor/NavBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

const calculateMaxDate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 23);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface SignupFormValues {
  fullName: string;
  profilePictureUrl: string;
  email: string;
  registerNo: string;
  department: string;
  address: string;
  pincode: string;
  identityNo: string;
  phoneNo: string;
  gender: string;
  dob: string;
  password: string;
  confirmPassword: string;
  licenceCerificatesUrl: string;
  educationCerificatesUrl: string;
  experience: string;
  experienceCertificatesUrl: string;
  identityCertificateUrl: string;
}

interface Department {
  _id: string;
  name: string;
  about: string;
  isActive: boolean;
}

const initialValues: SignupFormValues = {
  fullName: '',
  profilePictureUrl: '',
  email: '',
  registerNo: '',
  department: '',
  address: '',
  pincode: '',
  identityNo: '',
  phoneNo: '',
  gender: '',
  dob: '',
  password: '',
  confirmPassword: '',
  licenceCerificatesUrl: '',
  educationCerificatesUrl: '',
  experience: '',
  experienceCertificatesUrl: '',
  identityCertificateUrl: '',
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  registerNo: Yup.string().required('Register No is required'),
  department: Yup.string().required('Department is required'),
  address: Yup.string().required('Address is required'),
  pincode: Yup.string().required('Pincode is required'),
  identityNo: Yup.string().required('Identity No is required'),
  phoneNo: Yup.string().min(10, 'Enter valid Phone number').required('Phone No is required'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.date().max(new Date(calculateMaxDate()), 'You must be at least 23 years old').required('Date of Birth is required').nullable(),
  password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Confirm Password is required'),
  profilePicture: Yup.mixed().required('Profile Picture is required'),
  licenceCerificates: Yup.mixed().required('Licence Certificate is required'),
  educationCerificates: Yup.mixed().required('Education Certificate is required'),
  experience: Yup.string(),
  experienceCertificates: Yup.mixed(),
  identityCertificate: Yup.mixed().required('Identity Certificate is required'),
});

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const maxDate = calculateMaxDate();
  const doctorData = useSelector((state: any) => state.persisted.doctor.doctorData);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [experience, setExperience] = useState<File | null>(null);
  const [identityProof, setIdentityProof] = useState<File | null>(null);
  const [education, setEducation] = useState<File | null>(null);
  const [licence, setLicence] = useState<File | null>(null);



  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, files } = e.target;


    if (files && files.length > 0) {

      if (name === 'profilePictureUrl') {
        setProfilePicture(files[0]);
        console.log("name--------------------------", name, files[0]);
      } else if (name === 'licenceCerificatesUrl') {
        setLicence(files[0]);
        console.log("name--------------------------", name, files[0]);
      } else if (name === 'educationCerificatesUrl') {
        setEducation(files[0]);
        console.log("name--------------------------", name, files[0]);
      } else if (name === 'experienceCertificatesUrl') {
        setExperience(files[0]);
        console.log("name--------------------------", name, files[0]);
      } else if (name === 'identityCertificateUrl') {
        setIdentityProof(files[0]);
        console.log("name--------------------------", name, files[0]);


      }

    }
  };


  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Set your upload preset here

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      return null;
    }
  };



  useEffect(() => {
    axios.get<{ departments: Department[] }>(`http://localhost:3000/api/admin/departments`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          const departmentData = response.data.departments;
          setDepartments(departmentData);
        } else {
          toast.error(`Error while fetching department data`);
        }
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        toast.error(`Error fetching department data: ${error.message}`);
      });
  }, []);

  useEffect(() => {
    if (doctorData && doctorData._id) {
      navigate('/doctor/doctor-profile');
    }
  }, [doctorData, navigate]);

  const [showModal, setShowModal] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);




  const handleSubmit = async (values: SignupFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {

    console.log("form data---->>", values, "---------------");



    const profilePictureUrl = profilePicture ? await uploadFile(profilePicture) : '';
    const licenceCerificatesUrl = licence ? await uploadFile(licence) : '';
    const educationCerificatesUrl = education ? await uploadFile(education) : '';
    const experienceCertificatesUrl = experience ? await uploadFile(experience) : '';
    const identityCertificateUrl = identityProof ? await uploadFile(identityProof) : '';
    console.log("image paths...", profilePictureUrl, licenceCerificatesUrl, educationCerificatesUrl, experienceCertificatesUrl, identityCertificateUrl);


    const updatedValues = { ...values, profilePictureUrl, licenceCerificatesUrl, educationCerificatesUrl, experienceCertificatesUrl, identityCertificateUrl };


    axios.post(`http://localhost:3000/api/doctor/signup`, updatedValues, { withCredentials: true, })
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

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handlePrev = () => {
    setStep(prevStep => prevStep - 1);
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex justify-center items-center w-full mt-8 bg-white px-5 py-5">
        <div className="xl:max-w-7xl pb-60 bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
          <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-secondary">
              Create Account
            </h1>

            <ul className="steps w-full mt-10 mb-10">
              <li className={`step ${step >= 1 ? "step-primary" : ""}`}>ACCOUNT </li>
              <li className={`step ${step >= 2 ? "step-primary" : ""}`}>BIO</li>
              <li className={`step ${step >= 3 ? "step-primary" : ""}`}>EDUCATION & EXPERIENCE</li>
              <li className={`step ${step >= 4 ? "step-primary" : ""}`}>LICENSE</li>
            </ul>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form encType="multipart/form-data">
                  {step === 1 && (
                    <div className="w-full mt-5 sm:mt-8">
                      <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                        <div>
                          <Field
                            type="text"
                            name="fullName"
                            placeholder="Enter Your Full Name"
                            className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary"
                          />
                          <ErrorMessage name="fullName" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <Field
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary"
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <Field
                            type="text"
                            name="phoneNo"
                            placeholder="Phone Number"
                            className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary"
                          />
                          <ErrorMessage name="phoneNo" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary"
                          />
                          <ErrorMessage name="password" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <Field
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary"
                          />
                          <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="w-full mt-5 sm:mt-8">
                      <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                        <div>
                          <Field
                            type="text"
                            name="address"
                            placeholder="Address"
                            className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary"
                          />
                          <ErrorMessage name="address" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <Field
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary"
                          />
                          <ErrorMessage name="pincode" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <Field
                            type="text"
                            name="identityNo"
                            placeholder="Identity Number"
                            className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary"
                          />
                          <ErrorMessage name="identityNo" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <Field as="select" name="gender" className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary">
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </Field>
                          <ErrorMessage name="gender" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <Field
                            type="date"
                            name="dob"
                            max={maxDate}
                            className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary"
                          />
                          <ErrorMessage name="dob" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <Field
                            type="text"
                            name="registerNo"
                            placeholder="Register Number"
                            className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary"
                          />
                          <ErrorMessage name="registerNo" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <Field as="select" name="department" className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary">
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                              <option key={dept._id} value={dept._id}>{dept.name}</option>
                            ))}
                          </Field>
                          <ErrorMessage name="department" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <label htmlFor="profilePictureUrl" className="block text-gray-700">Profile Picture</label>
                          <input
                            id="profilePictureUrl"
                            name="profilePictureUrl"
                            type="file"
                            onChange={
                              handleFileChange}
                            className="file-input file-input-primary w-full"
                          />
                          <ErrorMessage name="profilePictureUrl" component="div" className="text-red-500" />
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="w-full mt-5 sm:mt-8">
                      <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                        <div>
                          <Field
                            type="text"
                            name="experience"
                            placeholder="Experience"
                            className="w-full input input-md border border-gray-400 focus:outline-none focus:border-primary"
                          />
                          <ErrorMessage name="experience" component="div" className="text-red-500" />
                        </div>

                        <div>
                          <label htmlFor="experienceCertificates" className="block text-gray-700">Experience Certificate</label>
                          <input
                            id="experienceCertificatesUrl"
                            name="experienceCertificatesUrl"
                            type="file"
                            onChange={
                              handleFileChange}
                            className="file-input file-input-primary w-full"
                          />
                          <ErrorMessage name="experienceCertificatesUrl" component="div" className="text-red-500" />
                        </div>
                        <div>
                          <label htmlFor="educationCerificates" className="block text-gray-700">Education Certificate</label>
                          <input
                            id="educationCerificates"
                            name="educationCerificates"
                            type="file"
                            onChange={
                              handleFileChange}
                            className="file-input file-input-primary w-full"
                          />
                          <ErrorMessage name="educationCerificates" component="div" className="text-red-500" />
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="w-full mt-5 sm:mt-8">
                      <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                        <div>
                          <label htmlFor="licenceCerificatesUrl" className="block text-gray-700">Licence Certificate</label>
                          <input
                            id="licenceCerificatesUrl"
                            name="licenceCerificatesUrl"
                            type="file"
                            onChange={
                              handleFileChange
                            }
                            className="file-input file-input-primary w-full"
                          />
                          <ErrorMessage name="licenceCerificatesUrl" component="div" className="text-red-500" />
                        </div>



                        <div>
                          <label htmlFor="identityCertificate" className="block text-gray-700">Identity Certificate</label>
                          <input
                            id="identityCertificateUrl"
                            name="identityCertificateUrl"
                            type="file"
                            onChange={
                              handleFileChange}
                            className="file-input file-input-primary w-full"
                          />
                          <ErrorMessage name="identityCertificateUrl" component="div" className="text-red-500" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handlePrev}
                      disabled={step === 1}
                    >
                      Previous
                    </button>
                    {step < 4 ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    ) : (
                      <button onClick={()=>handleSubmit}  className="btn btn-primary" disabled={isSubmitting} 
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>


      {showModal && (
        <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl mb-4">Enter OTP</h2>
            <input
              type="text"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleOTPSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {signUpSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl mb-4">Signup Successful!</h2>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSignUpSuccess(false);
                navigate('/doctor/doctor-profile');
              }}
            >
              Go to Profile
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SignupPage;




const calculateMaxDate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 23);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  const maxDate = calculateMaxDate();


    // fullName: '',
    // registerNo: '',
    // department: '',
    // address: '',
    // pincode: '',
    // phoneNo: '',
    // gender: '',
    // dob: '',




    // registerNo: Yup.string().required('Register No is required'),
    // department: Yup.string().required('Department is required'),
    // address: Yup.string().required('Address is required'),
    // pincode: Yup.string().required('Pincode is required'),
    // phoneNo: Yup.string().min(10, 'Enter valid Phone number').required('Phone No is required'),
    // gender: Yup.string().required('Gender is required'),
    // dob: Yup.date().max(new Date(maxDate), 'You must be at least 23 years old').required('Date of Birth is required').nullable(),
   







                      {/* <div>
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
                      */}  