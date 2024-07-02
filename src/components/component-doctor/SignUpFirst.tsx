import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';







interface ChildProps {
    sendDataToParent: (data: string) => void;
}


function SignUpFirst({ sendDataToParent }: ChildProps) {

    const initialValues = {
        email: '',
        fullName: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const handleSubmit = (values: any, { setSubmitting }: any) => {
        axios.post(`http://localhost:3000/api/doctor/signup`, { formData: values }, { withCredentials: true })
            .then(response => {
                if (response.data.status) {
                    sendDataToParent("otp")
                }
            })
            .catch(error => {
                console.error('Signup failed:', error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };




    return (
        <>
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



        </>
    )
}

export default SignUpFirst