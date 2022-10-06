import React from "react";
import ContentContainer from "../UI/ContentContainer";
import DecorativeSVG from "../../assets/Radial.svg";

const AboutUs = () => {
  return (
    <section className="relative bg-gray-100 overflow-hidden  rounded-br-[100px]  md:rounded-br-[140px]">
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
            complex and may be linked to wide range of social factors including
            the legacy of The Troubles, increased deprivation and mental
            ill-health. Reducing current suicide rates requires a multi-facetted
            approach.
          </p>
          <p className="md:pr-10 lg:pr-96 leading-8">
            Recently, this has been recognised by the NI Assembly who have
            established a cross-departmental group focused on mental health
            improvement for NI. The Suicide Prevention Research and Impact
            Network (SPRIN) will create space to ensure that evidence supports
            the allocation of resources as effectively as possible. The evidence
            that has been effectively translated into practice may be making an
            impact. With more consistent approaches to monitoring and
            evaluating, that learning would be shared nationally and
            internationally, to ultimately prevent more deaths.
          </p>
          <p className="md:pr-10 lg:pr-96 leading-8">
            Suicide prevention requires a focused, multi-disciplinary and
            multi-pronged approach that is effectively coordinated with strong
            leadership. The relationships established within the network will
            support the facilitation of research evidence getting effectively
            translated into policy and practice. SPRIN is co-chaired by Dr Karen
            Galway, Mental Health Lecturer in Queen's University Belfast and
            Professor Siobhan O'Neill, Interim Mental Health Champion and
            Professor of Mental Health at Ulster University.
          </p>
        </div>
        {/* DECORATIVE SVG */}
      </ContentContainer>
    </section>
  );
};

export default AboutUs;
