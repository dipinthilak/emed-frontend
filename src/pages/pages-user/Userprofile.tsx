import { useEffect } from "react"
import Navbar from "../../components/components-user/Navbar"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Userprofile() {
    const navigate = useNavigate();
    const userData = useSelector(
        (state: any) => state.persisted.user.userData
    );
    useEffect(() => {
        if (!userData._id) {
            navigate('/login');
        }


    });
    return (
        <>

            <Navbar />

            <div className="flex justify-between h-[88vh] w-full bg-blue-100">
                <div className="flex flex-col w-[20vw] h-full bg-blue-100">
                    <ul className="menu mt-24 mb-auto w-full bg-blue-50 text-xl text-base-content">
                        <li className="bg-blue-100 pt-2 pb-2 rounded-xl font-bold text-xl">
                            <a>ACCOUNT DETAILS</a>
                        </li>
                        <li className="bg-blue-200 pt-2 pb-2 rounded-xl font-bold text-xl">
                            <a>CONSULTATION</a>
                        </li>
                        <li className="bg-blue-100 pt-2 pb-2 rounded-xl font-bold text-xl">
                            <a>MEDICAL HISTORY</a>
                        </li>
                        <li className="bg-blue-200 pt-2 pb-2 rounded-xl font-bold text-xl">
                            <a>FAMILY MEMBERS</a>
                        </li>
                        <li className="bg-blue-100 pt-2 pb-2 rounded-xl font-bold text-xl">
                            <a>WALLET</a>
                        </li>
                        <li className="bg-blue-200 pt-2 pb-2 rounded-xl font-bold text-xl">
                            <a>ACCOUNT SETTINGS</a>
                        </li>
                    </ul>
                </div>
                <div className="w-[80vw] h-full p-1 bg-blue-100">
                <div className="text-black text-xl ml-20 mt-20">
                                    <p className="mt-10 mb-10 text-2xl underline">ACCOUNT DETAILS</p>
                                    <table className="w-full border-collapse border border-gray-200">
                                        <tbody>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Name</td>
                                                <td className="border px-4 py-2">{userData?.fullName}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Email</td>
                                                <td className="border px-4 py-2">{userData?.email}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Gender</td>
                                                <td className="border px-4 py-2">{userData?.gender || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Phone</td>
                                                <td className="border px-4 py-2">{userData?.phoneNo || "please update from account details"}</td>
                                            </tr>
                                            <tr>
                                                <td className="border px-4 py-2 font-semibold">Address</td>
                                                <td className="border px-4 py-2">{userData?.address || "please update from account details"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                </div>
            </div>

        </>
    )
}
export default Userprofile