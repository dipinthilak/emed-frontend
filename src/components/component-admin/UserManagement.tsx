import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  _id: string;
  fullName: string;
  email: string;  
  address: string;
  phoneNo: string;
  gender: string;
  isActive: boolean;
}

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    axios.get<{ users: User[] }>('http://localhost:3000/api/admin/users', { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [refresh]);

  const handleStatusChange = (userId: string) => {
    axios.patch(`http://localhost:3000/api/admin/change-user-status/${userId}`, null, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setRefresh(!refresh);
          if (response.data.user.isActive) {
            toast.success(`${response.data.user.fullName} unblocked`);
          } else {
            toast.error(`${response.data.user.fullName} blocked`);
          }
        }
      })
      .catch((error) => {
        console.error("Error changing user status:", error);
        toast.error("Failed to change user status.");
      });
  };

  const handleUserview = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-row w-[80vw] h-[88vh] bg-teal-50">
      <div className="ml-14 mt-5">
        <h1 className="pl-10 text-3xl">User List</h1>
        <div className="overflow-x-auto mt-14">
          <table className="table table-zebra table-lg">
            <thead>
              <tr className="text-xl text-black">
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Reports</th>
                <th>Status</th>
                <th>User Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="hover">
                  <th>{user.fullName}</th>
                  <td>{user.email}</td>
                  <td>{user.phoneNo}</td>
                  <td>0</td>
                  <td>
                    {user.isActive 
                      ? (<p className="font-bold text-xs text-blue-500">ACTIVE</p>) 
                      : (<p className="font-bold text-xs text-red-400">BLOCKED</p>)
                    }
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs" onClick={() => handleUserview(user)}>View Details</button>
                  </td>
                  <td>
                    {user.isActive ? (
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-300"
                        onClick={() => handleStatusChange(user._id)}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300"
                        onClick={() => handleStatusChange(user._id)}
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
      </div>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-1/3">
            <h2 className="text-2xl mb-4">User Details</h2>
            <p><strong>Name:</strong> {selectedUser.fullName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone No:</strong> {selectedUser.phoneNo}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
            <p><strong>Status:</strong> {selectedUser.isActive ? 'Active' : 'Blocked'}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
