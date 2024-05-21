
const SignUpForm = () => {


  return (
    <div className="flex justify-center items-center w-full  mt-8 bg-white px-5 py-5">
      <div className="xl:max-w-7xl pb-60 bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">

        <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-primary">
            Create Account
          </h1>
          <div className="w-full mt-5 sm:mt-8">
            <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Enter Your First Name"
                  className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                />

                <input
                  type="text"
                  placeholder="Enter Your Last Name"
                  className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                />
              <input
                type="text"
                placeholder="Enter Your Email"
                className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
              />
              <input
                type="textarea"
                placeholder="Enter Your Address"
                className="input input-bordered input-primary w-full h-20 text-black placeholder:text-black/70"
              />
                            <input
                type="text"
                placeholder="Enter Your Phone No"
                className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
              />
              <input
                type="Password"
                placeholder="Enter Your Password"
                className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
              />
              <input
                type="Password"
                placeholder="Re-enter Your Password"
                className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
              />

              <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center m-12">
                <button className="btn btn-active btn-primary btn-block max-w-[200px] text-white text-xl">
                  Sign Up
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm