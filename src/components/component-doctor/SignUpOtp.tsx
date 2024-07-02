import axios from 'axios';
import {useState } from 'react';







interface ChildProps {
    sendDataToParent: (data: string) => void;
}


function SignUpOtp({ sendDataToParent }: ChildProps) {
  const [otpValue, setOtpValue] = useState('');


    const handleOTPSubmit = () => {
        axios.post(`http://localhost:3000/api/doctor/verify-otp`, { otpValue: parseInt(otpValue) }, { withCredentials: true })
          .then(response => {
            console.log(response);
    
            if (response.data.verification) {
                sendDataToParent("success")
            } else {
              alert("Enter OTP again");
            }
          })
          .catch(error => {
            console.error('OTP verification failed:', error);
          });
      };
    




    return (
        <>
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-secondary">
                O T P 
            </h1>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div  className="bg-white p-8 rounded shadow-md">
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

        </>
    )
}

export default SignUpOtp;