import React, { useEffect, useState } from "react";
import Stat from "../components/Admin/Stat";
import { Table } from "../components/Admin/Table/Table";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import Navbar from "../components/UI/Navbar/Navbar";
import { useSelector } from "react-redux";
import UserRoles from "../services/UserRoles";
import { useNavigate } from "react-router-dom";
import { initializeUsers } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import UserForm from "../components/Admin/UserForm/UserForm";
import ConfirmationModal from "../components/UI/ConfirmationModal";
import { deleteUser } from "../reducers/userReducer";
import { initializeStats } from "../reducers/statsReducer";

// Admin page
// Displays the admin dashboard
const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth);
    const stats = useSelector((state) => state.stats);

    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [chosenUser, setUser] = useState(null);

    // Redirects to home if user is not an admin
    // Fetches all users and stats if user is an admin
    useEffect(() => {
        if (!user || user.role !== UserRoles.ADMIN) navigate("/home");
        const initialize = async () => {
            await dispatch(initializeUsers());
            await dispatch(initializeStats());
        };
        initialize();
    }, []);

    const editUser = (user) => {
        setUser(user);
        setOpen(true);
    };

    const delUser = (user) => {
        setUser(user);
        setConfirmOpen(true);
    };

    return (
        <div className="min-h-screen">
            <ConfirmationModal
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={() => {
                    // console.log(chosenUser._id);
                    dispatch(deleteUser(chosenUser._id));
                    setConfirmOpen(false);
                }}
            >
                Are you sure you want to delete this user?
            </ConfirmationModal>
            <UserForm
                open={open}
                setOpen={setOpen}
                user={chosenUser}
                admin={true}
            />
            <Navbar transparent={false} />
            <ContentContainer>
                <Heading>Admin Page</Heading>
                {/* STATS */}
                <h3 className="mt-10 mb-4 font-display text-darkblue-100 text-2xl">
                    Monthly stats
                </h3>
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 gap-2 sm:gap-8 lg:grid-cols-4 lg:gap-2 xl:gap-10">
                        <Stat number={stats.views}>Monthly Views</Stat>
                        <Stat number={stats.users}>New Users</Stat>
                        <Stat number={stats.resources}>New Resources</Stat>
                        <Stat number={stats.events}>New Events</Stat>
                    </div>
                </div>
                {/* APPROVE USERS TABLE */}
                <h3 className="mt-10 mb-10 font-display text-darkblue-100 text-2xl">
                    User Management
                </h3>

                <div className="overflow-x-scroll">
                    <Table editUser={editUser} deleteUser={delUser} />
                </div>
            </ContentContainer>
        </div>
    );
};

export default Admin;
