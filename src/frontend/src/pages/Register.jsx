import React from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";

const Register = () => {
  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <section className="w-full">
        <ContentContainer>
          <Heading>Register</Heading>
        </ContentContainer>
        <ContentContainer className="flex justify-center">
          <div className="mb-10 items-center sm:w-4/5 md:w-2/3 xl:w-3/6 lg:w-3/6 my-5 py-5">
            <form>
              {/* NAME */}
              <div className="flex flex-col gap-2 mx-2 pb-4">
                <label className="md:text-2xl text-darkblue-100">Name</label>
                <input
                  type="text"
                  className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 focus:outline-none focus:border-skyblue-200"
                />
                {/* ERROR MESSAGE */}
                <span className="min-h-[6px] text-red-500"></span>
              </div>
              <div className="flex flex-col gap-2 mx-2 pb-4">
                <label className="md:text-2xl text-darkblue-100">Email</label>
                <input
                  type="Email"
                  className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 focus:outline-none focus:border-skyblue-200"
                />
                {/* ERROR MESSAGE */}
                <span className="min-h-[6px] text-red-500"></span>
              </div>
              {/* PASSWORD */}
              <div className="flex flex-col gap-2 mx-2 pb-4">
                <label className="md:text-2xl text-darkblue-100">
                  Password
                </label>
                <input
                  type="Password"
                  className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 focus:outline-none focus:border-skyblue-200"
                />
                {/* ERROR MESSAGE */}
                <span className="min-h-[6px] text-red-500"></span>
              </div>
              {/* CONFIRM PASSWORD */}
              <div className="flex flex-col gap-2 mx-2 pb-4">
                <label className="md:text-2xl text-darkblue-100">
                  Confirm Password
                </label>
                <input
                  type="Password"
                  className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 focus:outline-none focus:border-skyblue-200"
                />
                {/* ERROR MESSAGE */}
                <span className="min-h-[6px] text-red-500"></span>
              </div>
              <div className="flex justify-center">
                <button className="bg-darkblue-100 text-white w-1/3 px-4 py-2 rounded-lg hover:bg-skyblue-200 transition-all">
                  Login
                </button>
              </div>
            </form>
          </div>
        </ContentContainer>
        {/* POST A RESOURCE BUTTON HERE */}
      </section>
    </div>
  );
};

export default Register;
