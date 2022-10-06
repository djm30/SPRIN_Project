import React from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import PartnerFlashCardsRight from "../components/Partners/PartnerCardsLeft";
import PartnerFlashCardsLeft from "../components/Partners/PartnerCardsRight";

const Partners = () => {
  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <section>
        <ContentContainer>
          <Heading>Network Partners</Heading>
        </ContentContainer>
        <PartnerFlashCardsRight/>
        <PartnerFlashCardsLeft/>
      </section>
    </div>
  );
};

export default Partners;
