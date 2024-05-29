import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AccountDeatils() {
    const navigate = useNavigate();
    const doctorData = useSelector(
        (state: any) => state.persisted.doctor.doctorData
    );
    useEffect(() => {
        if (!doctorData._id) {
            navigate('/doctor/login');
        }
    });
  return (
  <>
                  <div className="flex flex-row w-[80vw] h-[88vh] bg-white">
                    {doctorData.isVerified ? (<div className="flex items-center justify-center h-[bbvh] ml-auto mr-auto">
                        <p className="  text-3xl text-red-500 font-bold">
                            Your account verified by Admin
                            <div className="text-black text-xl">
                                <p className="mt-10 mb-10 text-2xl underline">ACCOUNT DETAILS</p>
                                <table className="w-full border-collapse border border-gray-200">
                                    <tbody>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Namdsdsddse</td>
                                            <td className="border px-4 py-2">{doctorData?.fullName}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Department</td>
                                            <td className="border px-4 py-2">{doctorData?.department || "please update from account details"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Email</td>
                                            <td className="border px-4 py-2">{doctorData?.email}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Gender</td>
                                            <td className="border px-4 py-2">{doctorData?.gender || "please update from account details"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Phone</td>
                                            <td className="border px-4 py-2">{doctorData?.phoneNo || "please update from account details"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Address</td>
                                            <td className="border px-4 py-2">{doctorData?.address || "please update from account details"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Date of Birth</td>
                                            <td className="border px-4 py-2">{doctorData?.dob || "please update from account details"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Register No</td>
                                            <td className="border px-4 py-2">{doctorData?.registerNo || "please update from account details"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </p>
                    </div>) : (<div className="flex items-center justify-center h-[bbvh] ml-auto mr-auto">
                        <p className="  text-3xl text-red-500 font-bold">
                            Your account not verified by Admin
                            <div className="text-black text-xl">
                                <p className="mt-10 mb-10 text-2xl underline">ACCOUNT dsdsdDETAILS</p>
                                <table className="w-full border-collapse border border-gray-200">
                                    <tbody>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Name</td>
                                            <td className="border px-4 py-2">{doctorData?.fullName}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Department</td>
                                            <td className="border px-4 py-2">{doctorData?.department || "please update from account details"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Email</td>
                                            <td className="border px-4 py-2">{doctorData?.email}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Gender</td>
                                            <td className="border px-4 py-2">{doctorData?.gender || "please update from account details"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Phone</td>
                                            <td className="border px-4 py-2">{doctorData?.phoneNo || "please update from account details"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Address</td>
                                            <td className="border px-4 py-2">{doctorData?.address ||"please update from account details"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Date of Birth</td>
                                            <td className="border px-4 py-2">{doctorData?.dob || "please update from account details"}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 font-semibold">Register No</td>
                                            <td className="border px-4 py-2">{doctorData?.registerNo || "please update from account details"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </p>


                    </div>)}
                </div> 
  </>
  )
}

export default AccountDeatils