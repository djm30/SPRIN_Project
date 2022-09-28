import React, { useRef } from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import Placeholder from "../assets/Placeholder.svg";
import ContentContainer from "../components/UI/ContentContainer";
import DecorativeSVG from "../assets/Radial.svg";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      {/* CALL TO ACTION */}
      <section
        id={styles.cta}
        className="h-screen w-screen bg-darkblue-100 bg-no-repeat   rounded-bl-[340px] relative overflow-hidden"
      >
        {/* NAVBAR */}
        <Navbar transparent={true} />
        {/* HEADING AND BUTTONS */}
        <ContentContainer className="mt-20 space-y-20 flex flex-col items-center">
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
            <a className="z-20 bg-skyblue-200 text-lg hover:bg-skyblue-300 transition-all text-white shadow-sm px-10 py-3 rounded-3xl select-none">
              Join Today
            </a>
            <a className="bg-grey-transparent text-lg hover:bg-skyblue-100 transition-all text-white shadow-sm px-10 py-3 rounded-3xl select-none">
              Learn More
            </a>
          </div>
        </ContentContainer>
      </section>
      {/* CARD SECTION */}
      <section className=" bg-white my-20 flex justify-center">
        <ContentContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 space-y-5 md:space-y-0">
          {/* SINGLE CARD */}
          <div className="border-[1px] max-w-[360px] md:max-w-none border-border-color shadow-lg xl:w-96 xl:h-[30rem] rounded-2xl flex flex-col items-center py-12 px-5 space-y-10">
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
          <div className="text-white border-[1px] max-w-[360px] md:max-w-none bg-darkblue-100 border-border-color shadow-lg xl:w-96 xl:h-[30rem] rounded-2xl flex flex-col items-center py-12 px-5 space-y-10">
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
          </div>
          {/* SINGLE CARD */}
          <div className="border-[1px] max-w-[360px] md:max-w-none border-border-color shadow-lg xl:w-96 xl:h-[30rem] rounded-2xl flex flex-col items-center py-12 px-5 space-y-10">
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
      <section className="relative bg-neutral-200 overflow-hidden  rounded-b-[60px] md:rounded-bl-none md:rounded-br-[140px]">
        {/* DECORATIVE SVG */}
        <img
          src={DecorativeSVG}
          className="absolute  lg:-top-12 xl:-top-20 -right-96 hidden lg:block"
        />
        <ContentContainer className={"py-20"}>
          <h3 className="text-center md:text-left  text-3xl md:text-5xl text-darkblue-100 font-display mb-20">
            About Us
          </h3>
          <div className="md:space-y-12 space-y-20 text-base md:text-lg text-center lg:text-left ">
            <p className="md:pr-10 lg:pr-96 leading-8">
              Suicide is a growing concern in Northern Ireland with our suicide
              rate being one of the highest in the UK. The reasons for this are
              complex and may be linked to wide range of social factors
              including the legacy of The Troubles, increased deprivation and
              mental ill-health. Reducing current suicide rates requires a
              multi-facetted approach.
            </p>
            <p className="md:pr-10 lg:pr-96 leading-8">
              Recently, this has been recognised by the NI Assembly who have
              established a cross-departmental group focused on mental health
              improvement for NI. The Suicide Prevention Research and Impact
              Network (SPRIN) will create space to ensure that evidence supports
              the allocation of resources as effectively as possible. The
              evidence that has been effectively translated into practice may be
              making an impact. With more consistent approaches to monitoring
              and evaluating, that learning would be shared nationally and
              internationally, to ultimately prevent more deaths.
            </p>
            <p className="md:pr-10 lg:pr-96 leading-8">
              Suicide prevention requires a focused, multi-disciplinary and
              multi-pronged approach that is effectively coordinated with strong
              leadership. The relationships established within the network will
              support the facilitation of research evidence getting effectively
              translated into policy and practice. SPRIN is co-chaired by Dr
              Karen Galway, Mental Health Lecturer in Queen's University Belfast
              and Professor Siobhan O'Neill, Interim Mental Health Champion and
              Professor of Mental Health at Ulster University.
            </p>
          </div>
          {/* DECORATIVE SVG */}
        </ContentContainer>
      </section>
      {/* PADDING BETWEEN ABOUT US AND FOOTER */}
      <div className="h-16"></div>
    </>
  );
};

export default Home;
