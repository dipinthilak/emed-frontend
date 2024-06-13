import Navbar from "../../components/component-doctor/NavBar"
import toast, { Toaster } from "react-hot-toast"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function DoctorData() {
    const navigate = useNavigate();
    const doctorData = useSelector(
        (state: any) => state.persisted.doctor.doctorData
    );
    function handleSubmit() {
        toast.error("NOT IMPLEMENTED!!")
    }

    return (
        <>
            <Navbar />
            <Toaster position="top-right" reverseOrder={true}></Toaster>
            <div className="flex flex-row ">
                <div className="flex flex-row h-[88vh] bg-green-100">
                    <ul className="menu mt-24 mb-auto  w-[20vw] ml-0 mr-0  bg-blue-50 text-xl text-base-content">
                        <li className="bg-green-100 pt-2 pb-2 rounded-xl font-bold text-xl" onClick={() => { navigate('/doctor/doctor-profile') }}><a>DASHBOARD</a></li>
                        <li className="bg-green-100 pt-2 pb-2 rounded-xl font-bold text-xl" onClick={() => { navigate('/doctor/account-details/') }}><a>UPDATE DETAILS</a></li>
                        <li className="bg-green-200 pt-2 pb-2 rounded-xl font-bold text-xl"><a>WALLET</a></li>
                        <li className=" bg-green-100 pt-2 pb-2 rounded-xl font-bold text-xl"><a>ACCOUNT SETTINGS</a></li>
                    </ul>
                </div>
                <div className="flex flex-row w-[80vw] h-[88vh] bg-white">
                    <div className="flex items-center justify-center h-[bbvh] ml-auto mr-auto">
                        <p className="  text-3xl text-red-500 font-bold">
                            <div className="text-black text-xl">
                                <p className="mt-10 mb-10 text-2xl underline">DETAILS</p>
                                <form >
                                    <table className="w-full border-collapse border border-gray-200">
                                        <tbody>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Name</td>
                                                <td className="border px-4 py-2">
                                                    <input className="bg-gray-200 w-fit" type="text"
                                                        name="Name"
                                                        id="name"
                                                        placeholder={doctorData?.fullName || "enter"} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Department</td>
                                                <td className="border px-4 py-2">
                                                    <input className="bg-gray-200" type="text"
                                                        name="Name"
                                                        id="name"
                                                        placeholder={doctorData?.department || "enter"} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Email</td>
                                                <td className="border px-4 py-2">
                                                <input className="bg-gray-200" type="text"
                                                        name="Name"
                                                        id="name"
                                                        placeholder={doctorData?.email || "enter"} />
                                                    </td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Gender</td>
                                                <td className="border px-4 py-2">
                                                <input className="bg-gray-200" type="text"
                                                        name="Name"
                                                        id="name"
                                                        placeholder={doctorData?.gender || "enter"} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Phone</td>
                                                <td className="border px-4 py-2">
                                                <input className="bg-gray-200" type="text"
                                                        name="Name"
                                                        id="name"
                                                        placeholder={doctorData?.phoneNo  || "enter"} />                                                    
                                                    </td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Address</td>                                                <td className="border px-4 py-2">
                                                <input className="bg-gray-200" type="text"
                                                        name="Name"
                                                        id="name"
                                                        placeholder={doctorData?.address  || "enter"} />                                                    
                                                    </td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Date of Birth</td>
                                                <td className="border px-4 py-2">
                                                <input className="bg-gray-200" type="text"
                                                        name="Name"
                                                        id="name"
                                                        placeholder={doctorData?.dob  || "enter"} />                                                    
                                                    </td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Register No</td>
                                                <td className="border px-4 py-2">
                                                <input className="bg-gray-200" type="text"
                                                        name="Name"
                                                        id="name"
                                                        placeholder={doctorData?.registerNo  || "enter"} />                                                    
                                                    </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                            <button className="btn btn-primary w-40 text-2xl  text-white mt-10" onClick={() => { handleSubmit() }}>UPDATE</button>

                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorData