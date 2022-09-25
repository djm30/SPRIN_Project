import React from "react";

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
            </div>
          </div>
        </nav>
      </div>
      <div className="h-96 bg-white">Hello</div>
    </>
  );
};

export default Home;
