import React from "react";
import MobileMenuLink from "./MobileMenuLink";
import { useSelector, useDispatch } from "react-redux";
import { submitLogout } from "../../../reducers/authReducer";
import { useAuthorized } from "../../../hooks/index";
import UserRoles from "../../../services/UserRoles";

// Navigation menu used when the hamburger menu is clicked
// Displays the navigation links and the logout button
const MobileMenu = ({ open }) => {
    const openClass = open ? "flex" : "hidden";

    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <div className="md:hidden z-10 transition-all">
            <div
                className={`rounded-lg max-w-sm mx-auto text-center z-10 absolute ${openClass} flex-col items-center self-end py-8 mt-10 space-y-1 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md shadow-md -translate-y-12
        `}
            >
                <MobileMenuLink to="/home">Home</MobileMenuLink>
                <MobileMenuLink to="/partners">Partners</MobileMenuLink>
                <MobileMenuLink to="/resources">Resources</MobileMenuLink>
                <MobileMenuLink to="/events">Events</MobileMenuLink>
                {useAuthorized(UserRoles.ADMIN) ? (
                    <MobileMenuLink to="/admin">Admin</MobileMenuLink>
                ) : (
                    ""
                )}
                {!user ? (
                    <>
                        <MobileMenuLink to="/login">Login</MobileMenuLink>
                        <MobileMenuLink to="/register">Register</MobileMenuLink>
                    </>
                ) : (
                    <button
                        onClick={() => {
                            dispatch(submitLogout());
                        }}
                        className="hover:bg-slate-50 w-full p-4 text-skyblue-300 hover:text-darkblue-100"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default MobileMenu;
