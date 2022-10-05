import React from "react";
import ContentContainer from "../UI/ContentContainer";
import Placeholder from "../../assets/Placeholder.svg";
import Card from "../UI/Card";


const PartnerFlashCards = () =>{
return(
<section className=" bg-white my-20 flex justify-center">
<ContentContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 space-y-5 md:space-y-0 space-x-4">
<Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col items-center py-12 px-5 space-y-10">
          {/* CARD HEADER */}
          <h4 className="text-darkblue-100 text-2xl font-display">
            All Party Group on Suicide Prevention
          </h4>
          {/* CARD ICON */}
          <div>
            <img src={Placeholder}></img>
          </div>
          {/* CARD TEXT */}
        </Card>
        <Card
          blue={true}
          className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col items-center py-12 px-5 space-y-10 text-white"
        >
          {/* CARD HEADER */}
          <h4 className="text-2xl font-display">Support</h4>
          {/* CARD ICON */}
          <div>
            <img src={Placeholder}></img>
          </div>
        </Card>
 <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col items-center py-12 px-5 space-y-10">
          {/* CARD HEADER */}
          <h4 className="text-darkblue-100 text-2xl font-display">
            Public Health Agency
          </h4>
          {/* CARD ICON */}
          <div>
            <img src={Placeholder}></img>
          </div>
          {/* CARD TEXT */}
 </Card>

</ContentContainer>
</section>
);
};

export default PartnerFlashCards;