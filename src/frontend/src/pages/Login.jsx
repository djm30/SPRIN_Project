import React from "react";
import Navbar from "../components/UI/Navbar/Navbar";

const Login = () => {
  return (
    <div className="min-h-screen">
    <section
        id={styles.cta}
        className="h-screen w-screen bg-darkblue-100 bg-no-repeat   rounded-bl-[30%] relative overflow-hidden"
      ></section>
      
      {/* NAVBAR */}
      <Navbar transparent={true} />
        {/* HEADING AND BUTTONS */}
        <ContentContainer className="mt-20 space-y-20 flex flex-col items-center">
          <div className="space-y-6 mr-32">
            <h1 className="text-6xl text-white font-display">
              LOGIN
            </h1>
            </div>
            </ContentContainer>
      <form>
      <div className="space-x-16">
          <h2>
            Email:
          </h2>
          <input className="bg-skyblue-200 text-lg text-white shadow-sm px-10 py-3 rounded-3xl type='Email'" />
          <h2>
            Password:
          </h2>
          <input className="bg-skyblue-200 text-lg text-white shadow-sm px-10 py-3 rounded-3xl type='Email'" />
          <a className="bg-skyblue-200 text-lg hover:bg-skyblue-300 transition-all text-white shadow-sm px-10 py-3 rounded-3xl select-none">
              Login
            </a>
            <a className="bg-skyblue-200 text-lg hover:bg-skyblue-300 transition-all text-white shadow-sm px-10 py-3 rounded-3xl select-none">
              Register
            </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
