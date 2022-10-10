import React from "react";
import ContentContainer from "../UI/ContentContainer";
import Placeholder from "../../assets/Placeholder.svg";
import Card from "../UI/Card";

const ConnectionSupportAdvocacy = () => {
  return (
    <section className=" bg-white my-20 flex justify-center">
      <ContentContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 space-y-5 md:space-y-0">
        {/* SINGLE CARD */}
        <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[30rem] flex flex-col items-center py-12 px-5 space-y-10">
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
        </Card>
        {/* SINGLE CARD */}
        <Card
          blue={true}
          className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[30rem] flex flex-col items-center py-12 px-5 space-y-10 text-white"
        >
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
        </Card>
        {/* SINGLE CARD */}
        <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[30rem] flex flex-col items-center py-12 px-5 space-y-10">
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
        </Card>
      </ContentContainer>
    </section>
  );
};

export default ConnectionSupportAdvocacy;