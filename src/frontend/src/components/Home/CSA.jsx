import React from "react";
import ContentContainer from "../UI/ContentContainer";
import Placeholder from "../../assets/Placeholder.svg";

const ConnectionSupportAdvocacy = () => {
  return (
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
          <h4 className="text-darkblue-100 text-2xl font-display">Advocacy</h4>
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
  );
};

export default ConnectionSupportAdvocacy;
