import axios from "axios";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface Department {
    _id: string;
    name: string;
    about: string;
    isActive: boolean;
}
interface userPaging{ 
    pageNo: number;
    totalPages: number; 
   };

function DepartmentManagement() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [newDepartment, setNewDepartment] = useState({
        name: '',
        about: '',
        isActive: true,
    });
    const [pageNo, setPageNo] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        axios.get<{ departments: Department[],userPaging: userPaging  }>(`http://localhost:3000/api/admin/departments`, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    const departmentData = response.data.departments;
                    setDepartments(departmentData);
                    setPageNo(response.data?.userPaging?.pageNo)
                    setTotalPages(response.data?.userPaging?.totalPages)
                } else {
                    toast.error(`Error while fetching department data`);
                }
            })
            .catch((error) => {
                console.error("Error fetching departments:", error);
                toast.error(`Error fetching department data: ${error.message}`);
            });
    }, [refresh]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            setNewDepartment({
                ...newDepartment,
                [name]: (e.target as HTMLInputElement).checked,
            });
        } else {
            setNewDepartment({
                ...newDepartment,
                [name]: value,
            });
        }
    };

    const handleAddDepartment = () => {
        setShowModal(true);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/admin/addDepartments`, newDepartment, { withCredentials: true });

            if (response.status === 201) {
                toast.success('Department added successfully!');
                setDepartments([...departments, response.data.department]);
                setShowModal(false);
                setNewDepartment({ name: '', about: '', isActive: true });
            } else {
                const message = response.data.message;
                toast.error(`${message}`);
            }
        } catch (error) {
            console.error('Error adding department:', error);
            toast.error(`Error adding department`);
        }
    };

    function handleStatusChange(departmentId: string): void {
        axios.patch(`http://localhost:3000/api/admin/change-department-status/${departmentId}`, null, { withCredentials: true })
            .then((response) => {
                if (response.status) {
                    console.log(response, "response from server------->>>");

                    setRefresh(!refresh);
                    if (response.data.department.isActive) {
                        toast.success(`${response.data.department.name} unblocked`);
                    } else {
                        toast.error(`${response.data.department.name} blocked`);
                    }
                }
            })
            .catch((error) => {
                console.error("Error changing department status:", error);
                toast.error("Failed to change department status.");
            });

    }

    return (
        <div className="flex flex-row w-[80vw] h-[88vh] bg-teal-50">
            <div className="ml-14 mt-14">
                <h1 className="pl-10 text-3xl">Department List</h1>
                <div className="flex flex-row btn-secondary justify-between items-center w-[70vw] h-[5vh] bg-teal-50">
                    <div></div>
                    <button className="btn align-content-end" onClick={handleAddDepartment}>ADD DEPARTMENT</button>
                </div>
                <div className="overflow-x-auto mt-2">
                    <table className="table table-lg">
                        <thead>
                            <tr className="text-xl text-black">
                                <th>Name</th>
                                <th>About</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map(department => (
                                <tr key={department._id} className="hover">
                                    <td>{department.name}</td>
                                    <td>{department.about}</td>
                                    <td>
                                        <button className={`btn btn-ghost btn-xs font-bold ${department.isActive ? "text-green-500" : "text-red-500"}`}>
                                            {department.isActive ? "ACTIVE" : "INACTIVE"}
                                        </button>
                                    </td>
                                    <td>
                                        {department.isActive ? (
                                            <button
                                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-300"
                                                onClick={() => handleStatusChange(department.name)}
                                            >
                                                Block
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300"
                                                onClick={() => handleStatusChange(department.name)}
                                            >
                                                Unblock
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg w-1/2">
                            <h2 className="text-2xl mb-4">Add New Department</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newDepartment.name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 p-2 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">About</label>
                                    <textarea
                                        name="about"
                                        value={newDepartment.about}
                                        className="w-full border border-gray-300 p-2 rounded-lg"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Active</label>
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={newDepartment.isActive}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <span>{newDepartment.isActive ? 'Active' : 'Inactive'}</span>
                                </div>
                                <div className="flex justify-end">
                                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost mr-2">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Add Department</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DepartmentManagement;
