import Navbar from "../../components/components-user/Navbar"
import Image from '../../../public/physician.jpg'
import Footer from "../../components/components-user/Footer"

function HomePage() {
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
            {/* <section className="bg-lime-100">
                <div>
                    <div className="flex flex-col p-10 justify-center items-center  text-3xl">
                        <p>CHOOSE YOUR DOCTOR</p>
                    </div>
                    <div className="flex flex-row justify-between h-[80vh] items-center md:justify-center p-10">
                        <div className="w-full flex flex-row">
                            <div className="border-rounded bg-white h-[25vh] m-10 pt-20 pb-20  w-1/3">
                                df
                            </div>
                            <div className="border-rounded bg-white m-10 h-[25vh] pt-20 pb-20 h-80vh w-1/3">
                                sdf
                            </div>
                            <div className="border-rounded bg-white m-10 h-[25vh] pt-20 pb-20 h-80vh w-1/3">
                                dsfs
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <Footer />


        </>

    )
}

export default HomePage