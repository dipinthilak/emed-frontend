import { Toaster } from "react-hot-toast";
import Navbar from "../../components/components-user/Navbar";
import UserUpdate from "../../components/components-user/UserUpdate";
import { Route, Routes } from "react-router-dom";
import Drawer from "../../components/components-user/Drawer";
import Members from "../../components/components-user/Members";
import Sample from "../../components/components-user/Sample";


function Userprofile() {
    return (
        <>
            <Navbar />
            <Toaster position="top-center" toastOptions={{ className: "mt-32 text-2xl" }} reverseOrder={true}></Toaster>
            <div className="flex justify-between h-[88vh] w-full bg-blue-100">
            <Drawer/>

                <div className="content">
                    <Routes>
                        <Route path="/" element={<UserUpdate />} />
                        <Route path="/members" element={<Members />} />
                        <Route path="/wallet" element={<Sample />} />
                    </Routes>

                </div>
            </div>

        </>
    )

}

export default Userprofile;
