import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import toast from "react-hot-toast";
interface User {
    _id: string;
    fullName: string;
    email: string;
    address: string;
    phoneNo: string;
    gender: string;
    isActive: boolean;
};

function UserUpdate() {
    const [user, setUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<User | null>(null);
    const navigate = useNavigate();
    const userData = useSelector((state: any) => state.persisted.user.userData);

    useEffect(() => {
        if (!userData._id) {
            navigate('/login');
        } else {
            fetchUserData();
        }
    }, [userData._id]);

    const fetchUserData = () => {
        axios.get(`http://localhost:3000/api/user/user-data/${userData._id}`, { withCredentials: true })
            .then((response) => {
                if (response.data.status) {
                    setUser(response.data.user);
                    console.log("user data from backend----", response.data.user);
                    setFormData(response.data.user);
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value } as User);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/user/update-user/${userData._id}`, formData, { withCredentials: true })
            .then((response) => {
                if (response.data.status) {
                    fetchUserData();
                    closeModal();
                    toast.success('user updated !')
                }
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
    };

    return (
        <>

                <div className="w-[80vw] h-full p-1 border bg-blue-100">
                    <div className="text-black text-xl ml-20 mt-20">
                        <p className="mt-10 mb-10 text-2xl underline">ACCOUNT DETAILS</p>
                        {user && (
                            <table className="w-full  border-gray-200">
                                <tbody>
                                    <tr>
                                        <td className="border px-4 py-2 font-semibold">Name</td>
                                        <td className="border px-4 py-2">{user?.fullName}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2 font-semibold">Email</td>
                                        <td className="border px-4 py-2">{user?.email}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2 font-semibold">Gender</td>
                                        <td className={user?.gender ? "border px-4 py-2" : "border px-4 py-2 text-green-600"}>{user?.gender || "Edit and update"}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2 font-semibold">Phone</td>
                                        <td className={user?.phoneNo ? "border px-4 py-2" : "border px-4 py-2 text-green-600"}>{user?.phoneNo || "Edit and update"}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2 font-semibold">Address</td>
                                        <td className={user?.address ? "border px-4 py-2" : "border px-4 py-2 text-green-600"}>{user?.address || "Edit and update"}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button onClick={openModal} className="btn btn-info flex flex-row ml-20 mt-10 border-blue-500">UPDATE USER DETAILS</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="bg-white mx-auto mt-52 border w-[40vw] h-[60vh] pl-20 pt-10" contentLabel="Edit User Details">
                <h2 className="text-2xl mt-12 ">Edit User Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-10">
                        <label>
                            Gender:
                            <select name="gender" value={formData?.gender || ''} required onChange={handleInputChange} className="select select-bordered w-full ml-10 max-w-xs">
                                <option value="" disabled>SELECT GENDER?</option>
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                            </select>
                        </label>
                    </div>
                    <div className="mt-10">
                        <label>
                            Phone:
                            <input type="number" maxLength={10} name="phoneNo" required placeholder="Type here" className="input w-full input-bordered max-w-xs ml-12" value={formData?.phoneNo || ''} onChange={handleInputChange} />

                        </label>
                    </div>
                    <div className="mt-10">
                        <label>
                            Address:
                            <input type="text" name="address" required placeholder="Type here" className="input w-full input-bordered max-w-xs ml-10" value={formData?.address || ''} onChange={handleInputChange} />
                        </label>
                    </div>
                    <div className="mt-10 pl-60">

                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" onClick={closeModal} className="btn btn-secondary  ml-10">Cancel</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default UserUpdate