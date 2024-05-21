const Footer = () => {
    return (
        <footer className="bg-gray-800 h-[35vh] text-white py-4">
            
            
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div >
                        <p>© 2024 E-med</p>
                    </div>
                    <div className="flex flex-col justify-between items-center">
                        <ul className="flex flex-col align-spa p-10">
                            <li className="mr-4 pt-5"><a href="#">Home</a></li>
                            <li className="mr-4 pt-5"><a href="#">About</a></li>
                            <li className="mr-4 pt-5 pb-5"><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-between items-center">
                        <ul className="flex flex-col align-spa p-10">
                            <li className="mr-4 pt-5"><a href="#">Home</a></li>
                            <li className="mr-4 pt-5"><a href="#">About</a></li>
                            <li className="mr-4 pt-5 pb-5"><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
