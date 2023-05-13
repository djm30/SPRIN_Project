import React from "react";
import ContentContainer from "../UI/ContentContainer";
import { ReactComponent as ConnectionIcon } from "../../assets/Connection.svg";
import { ReactComponent as SupportIcon } from "../../assets/Support.svg";
import { ReactComponent as AdvocacyIcon } from "../../assets/Advocacy.svg";
import Card from "../UI/Card";

// Connection, Support and Advocacy section
// Displays three cards with icons and text
const ConnectionSupportAdvocacy = () => {
    return (
        <section className=" bg-white my-20 flex justify-center">
            <ContentContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 space-y-5 2xl:gap-12  md:space-y-0">
                {/* SINGLE CARD */}
                <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[30rem] flex flex-col items-center py-12 px-5 space-y-10">
                    {/* CARD HEADER */}
                    <h4 className="text-darkblue-100 text-2xl font-display">
                        Connection
                    </h4>
                    {/* CARD ICON */}
                    <div>
                        <ConnectionIcon />
                    </div>
                    {/* CARD TEXT */}
                    <p className="text-center">
                        To develop communication channels to link academics,
                        policy makers, the community and voluntary sector, those
                        with lived experiences and those in professional
                        practice to support knowledge transfer and wider
                        self-harm and suicide prevention efforts within a
                        national and international context.
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
                        <SupportIcon />
                    </div>
                    {/* CARD TEXT */}
                    <p className="text-center">
                        To provide a central hub to highlight the latest
                        research, training and events to support and strengthen
                        evidence-based approaches to self-harm and suicide
                        prevention.
                    </p>
                </Card>
                {/* SINGLE CARD */}
                <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[30rem] flex flex-col items-center py-12 px-5 space-y-10">
                    {/* CARD HEADER */}
                    <h4 className="text-darkblue-100 text-2xl font-display">
                        Advocacy
                    </h4>
                    {/* CARD ICON */}
                    <div>
                        <AdvocacyIcon />
                    </div>
                    {/* CARD TEXT */}
                    <p className="text-center">
                        To create a strong voice to support evaluation and
                        quality improvement practices, to encourage relevant and
                        timely evidence-based policy development and
                        implementation, and to ensure research efforts are
                        strategically targeted and implemented effectively
                        according to the needs of those directly affected.
                    </p>
                </Card>
            </ContentContainer>
        </section>
    );
};

export default ConnectionSupportAdvocacy;
