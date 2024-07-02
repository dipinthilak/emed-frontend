import { useNavigate } from 'react-router-dom';

function Drawer() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row w-[20vw] h-[88vh] bg-blue-100">
            <ul className="menu mt-24 mb-auto w-full bg-blue-50 text-xl text-base-content">
                        <li className="bg-blue-100 pt-2 pb-2 rounded-xl font-bold text-xl" onClick={()=>{navigate('/user-profile/')}}>
                            <a>ACCOUNT DETAILS</a>
                        </li>
                        <li className="bg-blue-200 pt-2 pb-2 rounded-xl font-bold text-xl"  onClick={()=>{navigate('/user-profile/members')}}>
                            <a>FAMILY MEMBERS</a>
                        </li>
                        <li className="bg-blue-100 pt-2 pb-2 rounded-xl font-bold text-xl"  onClick={()=>{navigate('/user-profile/wallet')}}>
                            <a>WALLET</a>
                        </li>
                        <li className="bg-blue-200 pt-2 pb-2 rounded-xl font-bold text-xl">
                            <a>CONSULTATION</a>
                        </li>
                        <li className="bg-blue-100 pt-2 pb-2 rounded-xl font-bold text-xl">
                            <a>MEDICAL HISTORY</a>
                        </li>
                        <li className="bg-blue-200 pt-2 pb-2 rounded-xl font-bold text-xl">
                            <a>ACCOUNT SETTINGS</a>
                        </li>
                    </ul>

        </div>
    );
}
    
export default Drawer;
