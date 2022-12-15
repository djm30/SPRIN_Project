import React, { useState } from "react";
import ContentContainer from "../UI/ContentContainer";
import { Link } from "react-router-dom";
import HamburgerMenu from "../UI/Navbar/HamburgerMenu";
import MobileMenu from "../UI/Navbar/MobileMenu";
import JoinPopUp from "./JoinTodayPop";

const JoinTodayBar = ({ transparent }) => {
    const [open, setOpen] = useState(false);
    const bgColor = transparent ? "transparent" : "bg-skyblue-200";

    return (
        <nav className={`h-20 bg-skyblue-200 relative font-body text-white`}>
            {/* LABELS */}
            <ContentContainer className="flex justify-end space-x-12 items-center h-full relative">
                {/* LABELS */}
                <div className="flex items-end   space-x-6">
                    <p>Want to become our next collaborator?</p>
                </div>
                {/* BUTTON / BURGER */}
                <div>
                    <JoinPopUp />
                </div>
            </ContentContainer>
        </nav>
    );
};

export default JoinTodayBar;
