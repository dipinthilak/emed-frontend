import axios from "axios"
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { clearAdmin } from "../../rtk/slices/adminSlice";
function Drawer() {
    const navigate = useNavigate();
  const dispatch = useDispatch();



    const handleLogout = () => {
        console.log("admin logout started--->>");
        
        axios.get(`http://localhost:3000/api/admin/logout`, { withCredentials: true })
            .then((res) => {
                console.log(res,"<-----response");
                
                if (res.data.status) {   
                   const result= dispatch(clearAdmin()); 
                   console.log("clear admin result---->",result);
                    

                    navigate('/admin/login');
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <div className="flex flex-row w-[20vw] h-[88vh] bg-teal-100">

                <ul className="menu mt-24 mb-auto  w-[20vw] ml-0 mr-0  bg-teal-50 text-xl text-base-content">
                    <li className="bg-green-100 pt-2 pb-2 rounded-xl font-bold text-xl"><a>DASHBOARD</a></li>
                    <li className=" bg-green-200 pt-2 pb-2 rounded-xl font-bold text-xl"><a>USER MANAGEMENT</a></li>
                    <li className="bg-green-100 pt-2 pb-2 rounded-xl font-bold text-xl"><a>DOCTOR MANAGEMENT</a></li>
                    <li className=" bg-green-200 pt-2 pb-2 rounded-xl font-bold text-xl"><a>DEPARTMENT MANAGEMENT</a></li>
                    <li className=" bg-orange-300 text-zinc-950 font-bold text-xl mt-10 pt-2 rounded-3xl pb-2"><a onClick={handleLogout}>LOGOUT</a></li>
                </ul>

            </div>
        </>
    )
}

export default Drawer