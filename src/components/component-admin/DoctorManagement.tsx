import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Doctor {
  _id: string;
  fullName: string;
  email: string;
  registerNo: string;
  department: string;
  address: string;
  pincode: string;
  phoneNo: string;
  gender: string;
  dob: Date;
  isActive: boolean;
}

function DoctorManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    axios.get<{ doctors: Doctor[] }>('http://localhost:3000/api/admin/doctors?verified=true', { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setDoctors(response.data.doctors);
        }
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, [refresh]);

  const handleStatusChange = (doctorId: string) => {
    axios.patch(`http://localhost:3000/api/admin/change-doctor-status/${doctorId}`, null, { withCredentials: true })
      .then((response) => {
        if (response.status) {
          console.log(response,"response from server------->>>");
          
          setRefresh(!refresh);
          if (response.data.doctor.isActive) {
            toast.success(`${response.data.doctor.fullName} unblocked`);
          } else {
            toast.error(`${response.data.doctor.fullName} blocked`);
          }
        }
      })
      .catch((error) => {
        console.error("Error changing doctor status:", error);
        toast.error("Failed to change doctor status.");
      });
  };

  const handleDoctorView = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="flex flex-row w-[80vw] h-[88vh] bg-teal-50">
      <Toaster />
      <div className="ml-14 mt-5">
        <h1 className="pl-10 text-3xl">Doctor List</h1>
        <div className="overflow-x-auto mt-14">
          <table className="table table-zebra table-lg">
            <thead>
              <tr className="text-xl text-black">
                <th>Name</th>
                <th>Reg. No</th>
                <th>Email</th>
                <th>Dep.</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Doctor Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doctor => (
                <tr key={doctor._id} className="hover">
                  <th>{doctor.fullName}</th>
                  <td>{doctor.registerNo}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.department}</td>
                  <td>{doctor.address}</td>
                  <td>{doctor.phoneNo}</td>
                  <td>{doctor.gender}</td>
                  <td>
                    {doctor.isActive 
                      ? (<p className="font-bold text-xs text-blue-500">ACTIVE</p>) 
                      : (<p className="font-bold text-xs text-red-400">BLOCKED</p>)
                    }
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs" onClick={() => handleDoctorView(doctor)}>View Details</button>
                  </td>
                  <td>
                    {doctor.isActive ? (
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-300"
                        onClick={() => handleStatusChange(doctor._id)}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300"
                        onClick={() => handleStatusChange(doctor._id)}
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

      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-1/3">
            <h2 className="text-2xl mb-4">Doctor Details</h2>
            <p><strong>Name:</strong> {selectedDoctor.fullName}</p>
            <p><strong>Reg. No:</strong> {selectedDoctor.registerNo}</p>
            <p><strong>Email:</strong> {selectedDoctor.email}</p>
            <p><strong>Department:</strong> {selectedDoctor.department}</p>
            <p><strong>Address:</strong> {selectedDoctor.address}</p>
            <p><strong>Pincode:</strong> {selectedDoctor.pincode}</p>
            <p><strong>Phone No:</strong> {selectedDoctor.phoneNo}</p>
            <p><strong>Gender:</strong> {selectedDoctor.gender}</p>
            <p><strong>DOB:</strong> {new Date(selectedDoctor.dob).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {selectedDoctor.isActive ? 'Active' : 'Blocked'}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorManagement;
