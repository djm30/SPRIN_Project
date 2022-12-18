import React from "react";
import ContentContainer from "../UI/ContentContainer";
import Card from "../UI/Card";

const PreventionCardsTop = () => {
    return (
        <section className=" bg-white my-20 flex justify-center">
            <ContentContainer className="grid grid-cols-2 gap-4">
                <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col items-center py-12 px-5 space-y-10 space-x-10">
                    {/* CARD HEADER */}
                    <h4 className="text-darkblue-100 text-2xl font-display text-center">
                        Center for Suicide Canada
                    </h4>
                    {/* CARD IMAGE */}
                    <img
                        data-cy="prevLink"
                        src="https://www.suicideinfo.ca/wp-content/uploads/2016/11/csp_horz_logo_rgb_fullcolour.jpg"
                        onClick={() =>
                            window.open("https://www.suicideinfo.ca", "_blank")
                        }
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    />
                    {/* CARD TEXT */}
                </Card>
                <Card
                    className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col items-center py-12 px-5 space-y-10 space-x-10"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* CARD HEADER */}
                    <h4 className="text-darkblue-100 text-2xl font-display text-center">
                        International Association for Suicide Prevention
                    </h4>
                    {/* CARD IMAGE */}
                    <img
                        src="https://iasp.info/wp-content/uploads/IASP_Logo_Blue-1-e1612548384158.png"
                        onClick={() =>
                            window.open("https://www.iasp.info", "_blank")
                        }
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            maxWidth: "60%",
                            maxHeight: "60%",
                        }}
                    />
                    {/* CARD TEXT */}
                </Card>
                <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col items-center py-12 px-5 space-y-10 space-x-10">
                    {/* CARD HEADER */}
                    <h4 className="text-darkblue-100 text-1xl font-display text-center">
                        National Confidential Enquiry into Suicide and Safety in
                        Mental Health (UK)
                    </h4>
                    {/* CARD IMAGE */}
                    <img
                        src="https://ncab.hqip.org.uk/wp-content/uploads/2019/11/HQIP-logo-blue1301.png"
                        onClick={() =>
                            window.open(
                                "https://www.hqip.org.uk/resource/national-confidential-inquiry-into-suicide-and-safety-annual-report-2018/",
                                "_blank",
                            )
                        }
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            maxWidth: "60%",
                            maxHeight: "60%",
                        }}
                    />
                    {/* CARD TEXT */}
                </Card>
                <Card className="max-w-[360px] md:max-w-none xl:w-96 xl:h-[17rem] flex flex-col items-center py-12 px-5 space-y-10 space-x-10">
                    {/* CARD HEADER */}
                    <h4 className="text-darkblue-100 text-2xl font-display text-center">
                        National Office for Suicide Prevention Ireland (Ireland)
                    </h4>
                    {/* CARD IMAGE */}
                    <img
                        src="https://togetherdigital.imgix.net/63481/388x138/82728bbc5e/nosp.png?q=60&w=500&fm=jpg&ixlib=js-1.1.1&s=ba082b01665eef2cafe0b8b876068aa4"
                        onClick={() =>
                            window.open(
                                "https://www.hse.ie/eng/services/list/4/mental-health-services/nosp/",
                                "_blank",
                            )
                        }
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            maxWidth: "60%",
                            maxHeight: "60%",
                        }}
                    />
                    {/* CARD TEXT */}
                </Card>
            </ContentContainer>
        </section>
    );
};

export default PreventionCardsTop;
