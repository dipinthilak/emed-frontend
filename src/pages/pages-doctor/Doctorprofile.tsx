import { useEffect } from "react"
import Navbar from "../../components/component-doctor/NavBar"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Doctorprofile() {
    const navigate = useNavigate();
    const doctorData = useSelector(
        (state: any) => state.persisted.doctor.doctorData
    );
    useEffect(() => {
        console.log("123456",doctorData);
        
        if (!doctorData._id) {
            navigate('/doctor/login');
        }


    });
    return (
        <>

            <Navbar />

<div className="flex flex-row ">
<div className="flex flex-row h-[88vh] bg-green-100">

<ul className="menu mt-24 mb-auto  w-[20vw] ml-0 mr-0  bg-blue-50 text-xl text-base-content">
    <li className="bg-green-100 pt-2 pb-2 rounded-xl font-bold text-xl"><a>ACCOUNT DETAILS</a></li>
    <li className="bg-green-200 pt-2 pb-2 rounded-xl font-bold text-xl"><a>WALLET</a></li>
    <li className=" bg-green-100 pt-2 pb-2 rounded-xl font-bold text-xl"><a>ACCOUNT SETTINGS</a></li>
</ul>

</div>
<div className="flex flex-row w-[80vw] h-[88vh] bg-white">
{doctorData.status ?(<div className="flex items-center justify-center h-[bbvh] ml-auto mr-auto">
    <p className=" text-center text-4xl text-red-500 font-bold">
        Your account verified by Admin 
    </p>
</div>): (<div className="flex items-center justify-center h-[bbvh] ml-auto mr-auto">
    <p className=" text-center text-4xl text-red-500 font-bold">
        Your account not verified by Admin 
    </p>
</div>)}
</div>
</div>
        </>
    )
}
export default Doctorprofile