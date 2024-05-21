import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  fullName: string;
  email: string;
  address: string;
  phoneNo: string;
  gender: String;
  status: Boolean;
}

function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<{ users: User[] }>(`http://localhost:3000/api/admin/users`, { withCredentials: true })
      .then((res) => {
        const usersData = res.data.users;
        setUsers(usersData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="flex flex-row w-[80vw] h-[88vh] bg-teal-50">
      <div className="ml-14 mt-14">
        <h1 className="pl-10 text-3xl">User List</h1>
        <div className="overflow-x-auto mt-14">
          <table className="table table-lg 	">
            <thead>
              <tr className="text-xl text-black">
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>Gender</th>
                <th>Report</th>
                <th>Status</th>
                <th>User details</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="hover">
                  <th>{user.fullName}</th>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNo}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button className="btn btn-ghost btn-xs font-bold text-red-500 "> {user.gender === "male" ? 0 : 0}</button>
                  </td>                  
                  <td>
                    <button className="btn btn-ghost btn-xs font-bold text-red-500 "> {user.gender === "male" ? "ACTIVE" : "BLOCK"}</button>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs">View details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
