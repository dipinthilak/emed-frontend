const AboutUs = () => {
    return (
        <section className="bg-blue-50 py-16">
            <div className="container m-48 pl-32 flex flex-col md:flex-col ">
                <h2 className="text-5xl font-bold mb-8">About Us</h2>
                <div className="flex flex-col md:flex-row md:justify-center">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <p className="text-gray-700">
                        Welcome to e-Med, your trusted destination for convenient and reliable online medical consultations. At e-Med, we understand the importance of accessible healthcare, especially in today's fast-paced world. Our mission is to bridge the gap between patients and healthcare providers, offering a seamless platform for virtual consultations with licensed medical professionals from the comfort of your own home.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        {/* <img src="/about-us-image.jpg" alt="About Us Image" className="w-full rounded-lg shadow-md" /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
