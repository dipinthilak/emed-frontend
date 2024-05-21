import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/pages-user/HomePage"
import LoginPage from "./pages/pages-user/LoginPage"
import DoctorLoginPage from "./pages/pages-doctor/LoginPage"
import SignupPage from "./pages/pages-user/SignupPage"
import DoctorSignupPage from "./pages/pages-doctor/SignupPage"
import ContactPage from "./pages/pages-user/ContactPage"
import DoctorContactPage from "./pages/pages-doctor/ContactPage"
import AboutPage from "./pages/pages-user/AboutPage"
import DoctorAboutPage from "./pages/pages-doctor/AboutPage"
import AdminLoginPage from "./pages/pages-admin/LoginPage"
import Notfound from "./pages/pages-user/Notfound"
import Home from "./pages/pages-admin/Home"
import Userprofile from "./pages/pages-user/Userprofile"
import Doctorprofile from "./pages/pages-doctor/Doctorprofile"

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/signup' element={<SignupPage />}></Route>
      <Route path='/contact' element={<ContactPage />}></Route>
      <Route path='/doctor/contact' element={<DoctorContactPage />}></Route>
      <Route path='/about' element={<AboutPage />}></Route>
      <Route path='/doctor/about' element={<DoctorAboutPage />}></Route>


      <Route path='/user-profile' element={<Userprofile />}></Route>
      <Route path='/doctor-profile' element={<Doctorprofile />}></Route>


      <Route path='/doctor/login' element={<DoctorLoginPage />}></Route>
      <Route path='/doctor/signup' element={<DoctorSignupPage />}></Route>

      <Route path='/admin/' element={<Home />}></Route>
      <Route path='/admin/login' element={<AdminLoginPage />}></Route>
      <Route path='*' element={<Notfound />}></Route>

    </Routes>

  )
}

export default App
