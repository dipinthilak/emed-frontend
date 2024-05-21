import { useNavigate } from "react-router-dom"
function Navbar() {
    const navigate=useNavigate();

  return (
    <>
      <div className="navbar bg-secondary w-full h-28 tracking-widest font-black font-mono text-base-100">
        <div className="navbar-start">
          <a className="btn  btn-secondary text-white  text-4xl" onClick={()=>navigate('/')}>E-MED</a>
        </div>
        <div className="navbar-center hidden lg:flex">
        </div>
      </div>

    </>

  )
}

export default Navbar