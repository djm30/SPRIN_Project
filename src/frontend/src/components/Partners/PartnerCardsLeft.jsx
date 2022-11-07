import React from "react";
import ContentContainer from "../UI/ContentContainer";
import Placeholder from "../../assets/Placeholder.svg";
import Card from "../UI/Card";


const PartnerFlashCardsLeft = () =>{
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
            <p>Website: </p>
            <p>Email: </p>
            <p>Phone Number: </p>
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
            <p>Website: </p>
            <p>Email: </p>
            <p>Phone Number: </p>
          </div>
        </Card>
 <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col py-12 px-5 space-y-10 space-x-10">
          {/* CARD HEADER */}
          <h4 className="text-darkblue-100 text-2xl font-display">
            Public Health Agency
          </h4>
          {/* CARD ICON */}
          <div>
          <p>Summary: </p>
            <p>Website: </p>
            <p>Email: </p>
            <p>Phone Number: </p>
          </div>
          {/* CARD TEXT */}
 </Card>

</ContentContainer>
</section>
);
};

export default PartnerFlashCardsLeft;