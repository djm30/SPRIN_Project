import React from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";

const Login = () => {
  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <section className="w-full">
        <ContentContainer>
          <Heading>Login</Heading>
        </ContentContainer>
        {/* POST A RESOURCE BUTTON HERE */}
        <div className="mb-10 flex flex-col items-center ">
          <div className="w-full my-5 py-5 flex justify-center">
      <form>
        <div className="space-x-16">
          <h2 className="text-blue-600 font-display text-3xl">Email:</h2>
          <input className="bg-white text-lg text-blue-600 shadow-sm px-10 py-3 rounded-3xl type='Email'" />
        <div className="space-x-16">
          <h2 className="text-blue-600 font-display text-3xl">Password:</h2>
          <input className="bg-white text-lg text-blue-600 shadow-sm px-10 py-3 rounded-3xl type='Email'" />
        <div className="space-x-2 sm:space-x-16">
          <a className="z-20 bg-skyblue-200 md:text-lg hover:bg-skyblue-300 transition-all text-white shadow-sm px-10 py-3 rounded-3xl select-none">
            Login
          </a>
        </div>
        </div>
        </div>
      </form>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
