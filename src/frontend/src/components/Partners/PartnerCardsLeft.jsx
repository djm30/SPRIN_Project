import React from "react";
import ContentContainer from "../UI/ContentContainer";
import Placeholder from "../../assets/Placeholder.svg";
import Card from "../UI/Card";


const PartnerFlashCardsLeft = () =>{
  // This is a functional component that returns a section element with some classes and a ContentContainer component
return(
<section className=" bg-white my-20 flex justify-center">
<ContentContainer className="grid grid-cols-1 md:grid-cols-3 gap-2 space-y-5 md:space-y-0 space-x-1">
<Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col py-12 px-5 space-y-10">
          {/* CARD HEADER */}
          <h4 className="text-darkblue-100 text-2xl font-display">
            Mental Health Champion
          </h4>
          {/* CARD ICON */}
          <div>
          <p>Summary: </p>
          <p>Taking action to raise awareness of mental health and challenge stigma</p>
            <p>Website:</p>
            <a
            href="https://www.changeyourmindni.org"
            style={{
            color: "blue",
            textDecoration: "underline"
            }}
            target="_blank"
            rel="noopener noreferrer"
            >
            https://www.changeyourmindni.org
            </a>
          </div>
          {/* CARD TEXT */}
        </Card>
        <Card
          blue={true}
          className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col py-12 px-5 space-y-10 text-white"
        >
          {/* CARD HEADER */}
          <h4 className="text-2xl font-display">The Science Shop at QUB</h4>
          {/* CARD ICON */}
          <div>
          <p>Summary: </p>
          <p>Community-engaged research initiative creating connections with organisations across Northern Ireland</p>
            <p>Website:</p>
            <a
            href="https://www.qub.ac.uk/sites/ScienceShop/"
            style={{
            color: "white",
            textDecoration: "underline"
            }}
            target="_blank"
            rel="noopener noreferrer"
            >
            https://www.qub.ac.uk/sites/ScienceShop/
            </a>
          </div>
        </Card>
        <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col py-12 px-5 space-y-10">
          {/* CARD HEADER */}
          <h4 className="text-darkblue-100 text-2xl font-display text-center">
            Public Health Agency
          </h4>
          {/* CARD ICON */}
          <div>
          <p>Summary: </p>
          <p>Focuding on reforms to Health and Social Care (HSC) in Northern Ireland</p>
            <p>Website:</p>
            <a
        href="https://www.publichealth.hscni.net"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "blue",
          textDecoration: "underline"
        }}
      >
        https://www.publichealth.hscni.net
      </a>
          </div>
          {/* CARD TEXT */}
 </Card>

</ContentContainer>
</section>
);
};

export default PartnerFlashCardsLeft;