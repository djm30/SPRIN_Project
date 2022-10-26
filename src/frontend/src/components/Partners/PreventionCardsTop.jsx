import React from "react";
import ContentContainer from "../UI/ContentContainer";
import Card from "../UI/Card";


const PreventionCardsTop = () =>{
return(
<section className=" bg-white my-20 flex justify-center">
<ContentContainer className="grid grid-cols-2 gap-4">
<Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col items-center py-12 px-5 space-y-10 space-x-10">
          {/* CARD HEADER */}
          <h4 className="text-darkblue-100 text-2xl font-display text-center">
            Center for Suicide Canada
          </h4>
          {/* CARD TEXT */}
 </Card>
 <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col items-center py-12 px-5 space-y-10 space-x-10">
          {/* CARD HEADER */}
          <h4 className="text-darkblue-100 text-2xl font-display text-center">
            Internation Association for Suicide Prevention
          </h4>
          {/* CARD TEXT */}
 </Card>
 <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col items-center py-12 px-5 space-y-10 space-x-10">
          {/* CARD HEADER */}
          <h4 className="text-darkblue-100 text-2xl font-display text-center">
            National Confidential Enquiry into Suicide and Safety in Mental Health (UK)
          </h4>
          {/* CARD TEXT */}
 </Card>
 <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col items-center py-12 px-5 space-y-10 space-x-10">
          {/* CARD HEADER */}
          <h4 className="text-darkblue-100 text-2xl font-display text-center">
            National Office for Suicide Prevention Ireland (Ireland)
          </h4>
          {/* CARD TEXT */}
 </Card>

</ContentContainer>
</section>
);
};

export default PreventionCardsTop;