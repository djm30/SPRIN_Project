import React from "react";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      {/* CALL TO ACTION */}
      <div className="h-screen bg-darkblue-100 rounded-bl-[30%]">
        {/* NAVBAR */}
        <nav className="h-20 bg-darkblue-100 font-body text-white">
          {/* LABELS */}
          <div className="flex justify-between items-center h-full mx-40">
            {/* LABELS */}
            <div className="flex items-end space-x-12">
              <h4 className="text-3xl">SPRIN</h4>
              <div>
                <ol className="flex space-x-8 text-lg">
                  <li>Home</li>
                  <li>Partners</li>
                  <li>Events</li>
                  <li>Resources</li>
                </ol>
              </div>
            </div>
            {/* BUTTON / BURGER */}
            <div>
              <button className="bg-skyblue-100 px-9 py-3 rounded-xl shadow-sm">
                Login
              </button>
              {/* BURGER */}
              {/* TODO */}
              <div></div>
            </div>
          </div>
        </nav>
        {/* HEADING AND BUTTONS */}
        <div className="mx-40 mt-20 space-y-12">
          <div className="space-y-6 mr-32">
            <h1 className="text-6xl text-white font-display">
              Suicide Prevention & Research Impact Network
            </h1>
            <h2 className="text-5xl text-neutral-300 font-display">
              Focused on strengthening research-practice connections and
              improving the evidence base
            </h2>
          </div>
          <div>
            <button className="">Join Today</button>
            <button className="">Learn More</button>
          </div>
        </div>
      </div>
      <div className="h-96 bg-white">Hello</div>
    </>
  );
};

export default Home;
