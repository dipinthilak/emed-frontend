import { useEffect } from "react"
import Navbar from "../../components/component-doctor/NavBar"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";



function Doctorprofile() {
    const navigate = useNavigate();
    const doctorDatas = useSelector(
        (state: any) => state.persisted.doctor.doctorData
    );
    useEffect(() => {
        if (!doctorDatas._id) {
            navigate('/doctor/login');
        }
    });
    return (
        <>
            <Navbar />
            <Toaster position="top-right" reverseOrder={true}></Toaster>
            <div className="flex flex-row ">
                <div className="flex flex-row h-[88vh] bg-green-100">
                    <ul className="menu mt-24 mb-auto  w-[20vw] ml-0 mr-0  bg-blue-50 text-xl text-base-content">
                        <li className="bg-green-200 pt-2 pb-2 rounded-xl font-bold text-xl" onClick={() => { navigate('/doctor/doctor-profile') }}><a>DASHBOARD</a></li>
                        <li className="bg-green-100 pt-2 pb-2 rounded-xl font-bold text-xl" onClick={() => { navigate('/doctor/account-details/') }}><a>UPDATE DETAILS</a></li>
                        <li className="bg-green-200 pt-2 pb-2 rounded-xl font-bold text-xl"><a>WALLET</a></li>
                        <li className=" bg-green-100 pt-2 pb-2 rounded-xl font-bold text-xl"><a>ACCOUNT SETTINGS</a></li>
                    </ul>
                </div>

                <div className="content">
                </div>
                <div className="flex flex-row w-[80vw] h-[88vh] bg-white">
                    {doctorDatas.isVerified ? (
                        
                        <div className="flex items-center justify-center h-[bbvh] ml-auto mr-auto">
                            <p className="  text-3xl text-red-500 font-bold">
                                Your account verified by Admin
                                <div className="text-black text-xl">
                                    <p className="mt-10 mb-10 text-2xl underline">ACCOUNT DETAILS</p>
                                    <table className="w-full border-collapse border border-gray-200">
                                        <tbody>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Name</td>
                                                <td className="border px-4 py-2">{doctorDatas?.fullName}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Department</td>
                                                <td className="border px-4 py-2">{doctorDatas?.department || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Email</td>
                                                <td className="border px-4 py-2">{doctorDatas?.email}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Gender</td>
                                                <td className="border px-4 py-2">{doctorDatas?.gender || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Phone</td>
                                                <td className="border px-4 py-2">{doctorDatas?.phoneNo || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Address</td>
                                                <td className="border px-4 py-2">{doctorDatas?.address || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Date of Birth</td>
                                                <td className="border px-4 py-2">{doctorDatas?.dob || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Register No</td>
                                                <td className="border px-4 py-2">{doctorDatas?.registerNo || "please update from account details"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </p>
                        </div>) : (
                        <div className="flex items-center justify-center h-[bbvh] ml-auto mr-auto">
                            <p className="  text-3xl text-red-500 font-bold">
                                Your account not verified by Admin
                                <div className="text-black text-xl">
                                    <p className="mt-10 mb-10 text-2xl underline">ACCOUNT DETAILS</p>
                                    <table className="w-full border-collapse border border-gray-200">
                                        <tbody>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Name</td>
                                                <td className="border px-4 py-2">{doctorDatas?.fullName}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Department</td>
                                                <td className="border px-4 py-2">{doctorDatas?.department || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Email</td>
                                                <td className="border px-4 py-2">{doctorDatas?.email}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Gender</td>
                                                <td className="border px-4 py-2">{doctorDatas?.gender || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Phone</td>
                                                <td className="border px-4 py-2">{doctorDatas?.phoneNo || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Address</td>
                                                <td className="border px-4 py-2">{doctorDatas?.address || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Date of Birth</td>
                                                <td className="border px-4 py-2">{doctorDatas?.dob || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Register No</td>
                                                <td className="border px-4 py-2">{doctorDatas?.registerNo || "please update from account details"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </p>
                        </div>)}
                </div>
            </div>
        </>
    )
}
export default Doctorprofile