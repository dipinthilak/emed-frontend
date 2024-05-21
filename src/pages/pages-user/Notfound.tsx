import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/component-admin/Navbar'

function Notfound() {
    const navigate =useNavigate()
  return (
<>

<Navbar/>


<div className='bg-grey-100 h-[85vh] flex flex-col justify-center items-center pb-36'>
    <p className='text-2xl text-brown pb-10' >
       Invalid Address 
    </p>
    <button onClick={()=>{navigate('/')}} className="btn btn-secondary text-white text-2xl">Click Here</button>
</div></>

  )
}

export default Notfound