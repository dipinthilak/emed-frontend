import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface User {
    _id: string;
    fullName: string;
    email: string;
    address: string;
    phoneNo: string;
    gender: string;
    isActive: boolean;
    members: Member[];
}

interface Member {
    fullName: string;
    age: number;
    gender: string;
    relation: string;
    bloodGroup: string;
    weight: number;
    height: number;
}

function Members() {
    const [user, setUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Member>({
        fullName: '',
        age: 0,
        gender: '',
        relation: '',
        bloodGroup: '',
        weight: 0,
        height: 0
    });
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
        setFormData({ ...formData, [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userId=userData._id;
        axios.put(`http://localhost:3000/api/user/add-member/${userId}`, formData, { withCredentials: true })
            .then((response) => {
                if (response.data.status) {
                    toast.success('Member details updated successfully!');
                    // Optionally, refresh user data here
                } else {
                    toast.error('Failed to update member details.');
                }
            })
            .catch((error) => {
                console.error("Error updating member details:", error);
                toast.error('An error occurred while updating member details.');
            });
    };

    return (
        <>
            <div className="w-[80vw] h-full p-1 border bg-blue-100">
                <div className="text-black text-xl ml-20 mt-20 w-2/3">
                    <p className="mt-10 mb-10 text-2xl underline">MEMBERS DETAILS</p>
                    <div className="flex justify-between items-center">
                        <p className="mr-4">TOTAL MEMBERS : {0}</p>
                        <button onClick={openModal} className="btn btn-info border-blue-500 ">ADD MEMBERS</button>
                    </div>

                </div>
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="bg-white mx-auto mt-28 border border-blue-600 w-[50vw] h-[80vh] pl-20 pt-5 pr-20" contentLabel="Edit User Details">
                <p className="mt-10 mb-10 text-2xl underline">ADD MEMBERS</p>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                            Age
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {/* <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob ? formData.dob.toISOString().split('T')[0] : ''}
                            onChange={handleDateChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div> */}
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="relation">
                            Relation
                        </label>
                        <input
                            type="text"
                            name="relation"
                            value={formData.relation}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodGroup">
                            Blood Group
                        </label>
                        <input
                            type="text"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                            Weight (kg)
                        </label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                            Height (cm)
                        </label>
                        <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            ADD MEMBER
                        </button>
                        <button type="button" onClick={closeModal} className="btn btn-secondary  ml-10 mt-5">Cancel</button>

                    </div>
                </form>
            </Modal>
        </>
    );
}

export default Members;
