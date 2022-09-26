import React from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import Placeholder from "../assets/Placeholder.svg";
import ContentContainer from "../components/UI/ContentContainer";

const Home = () => {
  return (
    <>
      {/* CALL TO ACTION */}
      <section className="h-screen w-screen bg-darkblue-100 rounded-bl-[30%]">
        {/* NAVBAR */}
        <Navbar transparent={true} />
        {/* HEADING AND BUTTONS */}
        <ContentContainer className="mt-20 space-y-20 flex flex-col  items-center">
          <div className="space-y-6 mr-32">
            <h1 className="text-6xl text-white font-display">
              Suicide Prevention & Research Impact Network
            </h1>
            <h2 className="text-5xl text-neutral-300 font-display">
              Focused on strengthening research-practice connections and
              improving the evidence base
            </h2>
          </div>
          <div className="space-x-16">
            <a className="bg-skyblue-200 text-lg hover:bg-skyblue-300 transition-all text-white shadow-sm px-10 py-3 rounded-3xl">
              Join Today
            </a>
            <a className="bg-grey-transparent text-lg hover:bg-skyblue-100 transition-all text-white shadow-sm px-10 py-3 rounded-3xl">
              Learn More
            </a>
          </div>
        </ContentContainer>
      </section>
      {/* CARD SECTION */}
      <section className=" bg-white my-20">
        <ContentContainer className="grid grid-cols-1 md:grid-cols-3 ">
          {/* SINGLE CARD */}
          <div className="border-[1px] border-border-color shadow-lg w-96 h-[30rem] rounded-2xl flex flex-col items-center py-12 px-5 space-y-10">
            {/* CARD HEADER */}
            <h4 className="text-darkblue-100 text-2xl font-display">
              Connection
            </h4>
            {/* CARD ICON */}
            <div>
              <img src={Placeholder}></img>
            </div>
            {/* CARD TEXT */}
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris.
            </p>
          </div>
          {/* SINGLE CARD */}
          <div className="text-white border-[1px] bg-darkblue-100 border-border-color shadow-lg w-96 h-[30rem] rounded-2xl flex flex-col items-center py-12 px-5 space-y-10">
            {/* CARD HEADER */}
            <h4 className="text-2xl font-display">Support</h4>
            {/* CARD ICON */}
            <div>
              <img src={Placeholder}></img>
            </div>
            {/* CARD TEXT */}
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris.
            </p>
          </div>{" "}
          {/* SINGLE CARD */}
          <div className="border-[1px] border-border-color shadow-lg w-96 h-[30rem] rounded-2xl flex flex-col items-center py-12 px-5 space-y-10">
            {/* CARD HEADER */}
            <h4 className="text-darkblue-100 text-2xl font-display">
              Advocacy
            </h4>
            {/* CARD ICON */}
            <div>
              <img src={Placeholder}></img>
            </div>
            {/* CARD TEXT */}
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris.
            </p>
          </div>
        </ContentContainer>
      </section>
      {/* ABOUT US SECTION */}
      <section className="h-96 bg-neutral-200"></section>
      {/* PADDING BETWEEN ABOUT US AND FOOTER */}
      <div className="h-16"></div>
    </>
  );
};

export default Home;
