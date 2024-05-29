import Navbar from "../../components/components-user/Navbar"
import Image from '../../../public/physician.jpg'
import Footer from "../../components/components-user/Footer"
import { useEffect, useState } from "react"
import axios from "axios";


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

  interface Department {
    _id: string;
    name: string;
    about: string;
    isActive: boolean;
}

function HomePage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);


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

          axios.get<{ departments: Department[] }>('http://localhost:3000/api/admin/departments', { withCredentials: true })
          .then((response) => {
            if (response.status === 200) {
                setDepartments(response.data.departments);
            }
          })
          .catch((error) => {
            console.error("Error fetching doctors:", error);
          });
      
      
        }, []);
    return (
        <>
            <Navbar />
            <section className=" bg-white">
                <div className="flex flex-row justify-between items-center md:justify-center">
                    <div className="  border-rounded h-5/6 ps-10 pt-20 pb-20 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
                        <img className="rounded-lg" src={Image} />
                    </div>
                    <div className="  border-rounded ps-10 pt-20 pb-20 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2">
                        <p className="mb-5 text-3xl text-cyan-700">THE FUTURE OF MEDICAL CONDULTATIONS </p>
                        <p className="text-2xl text-cyan-700">BOOK AN APPOINMENT FOR YOU AND FAMILY</p>
                        <button className="mt-10 btn btn-xs btn-primary sm:btn-sm md:btn-md text-white  lg:btn-lg">BOOK CONSULTATION</button>

                    </div>
                </div>
            </section>

            
            <section className="bg-pink-100">
            <div>
                <div className="flex flex-col p-10 justify-center items-center text-4xl">
                    <p className="font-mono">OUR SPECIALIZATION</p>
                </div>
                <div className="flex flex-row justify-center  items-center p-10">
                    <div className="w-full flex flex-row flex-wrap justify-center">
                        {departments.map((department) => (
                            <div key={department._id} className="border-rounded rounded-2xl bg-white m-10 h-[20vh] p-10 w-1/6">
                                <h3 className="text-3xl font-bold">{department.name}</h3>
                                <p className="pt-5 text-xl text-gray-400">{department.about}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>


            <section className="bg-lime-100">
            <div>
                <div className="flex flex-col p-10 justify-center items-center text-4xl">
                    <p className="font-mono">CHOOSE YOUR DOCTOR</p>
                </div>
                <div className="flex flex-row justify-center  items-center p-16">
                    <div className="w-full flex flex-row flex-wrap justify-center">
                        {doctors.map((doctor) => (
                            <div key={doctor._id} className="border-rounded rounded-2xl bg-white m-10 h-[20vh] p-10  w-1/4">
                                <h3 className="text-5xl font-bold">{doctor.fullName}</h3>
                                <p className="pt-5 text-xl font-bold text-gray-500 ">{doctor.department}</p>
                                <p className="pt-5 text-xl font-bold text-gray-500 ">{doctor?.pincode}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>



            <Footer />


        </>

    )
}

export default HomePage