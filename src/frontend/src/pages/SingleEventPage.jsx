import React, { useState } from "react";
import SingleEvent from "../components/Events/SingleEvent";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import Navbar from "../components/UI/Navbar/Navbar";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { useSelector, useDispatch } from "react-redux";
import UserRoles from "../services/UserRoles";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/UI/ConfirmationModal";
import EventForm from "../components/Events/EventForm";
import { deleteEvent } from "../reducers/eventReducer";

const SingleEventPage = ({ event }) => {
    if (event === undefined) return <Loading />;
    if (event === null) return <NotFound />;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);
    let isAuthorized = false;
    if (auth) {
        isAuthorized = auth.role === UserRoles.ADMIN;
    }

    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const delEvent = () => {
        dispatch(deleteEvent(event._id));
        navigate("/events");
    };

    return (
        <div className="min-h-screen">
            <ConfirmationModal
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={delEvent}
            >
                Are you sure you want to delete this event?
            </ConfirmationModal>
            <EventForm
                open={open}
                setOpen={setOpen}
                event={event}
                edit={true}
            />
            <Navbar transparent={false} />
            <ContentContainer>
                <Heading>{event.title}</Heading>
                <div className="flex justify-center my-10 relative">
                    <SingleEvent
                        event={event}
                        isAuthorized={isAuthorized}
                        setOpen={setOpen}
                        setConfirmOpen={setConfirmOpen}
                    />
                </div>
            </ContentContainer>
        </div>
    );
};

export default SingleEventPage;
