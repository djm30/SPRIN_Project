import React, { useState } from "react";
import ContentContainer from "../ContentContainer";
import Navlink from "./Navlink";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import MobileMenu from "./MobileMenu";
import { useSelector, useDispatch } from "react-redux";
import { submitLogout } from "../../../reducers/authReducer";
import { useAuthorized } from "../../../hooks/index";
import UserRoles from "../../../services/UserRoles";

const Navbar = ({ transparent }) => {
    const [open, setOpen] = useState(false);
    const bgColor = transparent ? "transparent" : "darkblue-100";

    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <nav className={`h-20 bg-${bgColor} relative font-body text-white `}>
            {/* LABELS */}
            <ContentContainer className="flex justify-between items-center h-full relative ">
                {/* LABELS */}
                <div className="flex items-end space-x-12">
                    <Link to="/home">
                        <h4 className="text-3xl">SPRIN</h4>
                    </Link>
                    <div>
                        <ol className="space-x-8 text-lg hidden md:flex">
                            <Navlink to="/home">Home</Navlink>
                            <Navlink to="/partners">Partners</Navlink>
                            <Navlink to="/resources">Resources</Navlink>
                            <Navlink to="/events">Events</Navlink>
                            {useAuthorized(UserRoles.ADMIN) ? (
                                <Navlink to="/admin">Admin</Navlink>
                            ) : (
                                ""
                            )}
                        </ol>
                    </div>
                </div>
                {/* BUTTON / BURGER */}
                <div>
                    {user ? (
                        <button
                            onClick={() => {
                                dispatch(submitLogout());
                            }}
                            className="bg-white text-darkblue-100 hover:bg-skyblue-300 hover:text-white transition-all px-6 py-2 rounded-xl shadow-sm hidden md:block"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-skyblue-200 hover:bg-skyblue-300 transition-all px-6 py-2 rounded-xl shadow-sm hidden md:block"
                        >
                            Login
                        </Link>
                    )}

                    <HamburgerMenu open={open} setOpen={setOpen} />
                </div>
            </ContentContainer>
            <MobileMenu open={open} />
        </nav>
    );
};

export default Navbar;
