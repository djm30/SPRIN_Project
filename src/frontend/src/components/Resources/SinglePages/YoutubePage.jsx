import React, { useState } from "react";
import { ReactComponent as Clock } from "../../../assets/ClockWhite.svg";
import { format } from "date-fns";
import ConfirmationModal from "../../UI/ConfirmationModal";
import ResourceForm from "../ResourceForm";
import UserRoles from "../../../services/UserRoles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteResource } from "../../../reducers/resourceReducer";

const YoutubePage = ({ resource }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const auth = useSelector((state) => state.auth);
    let isAuthorized = false;
    if (auth) {
        isAuthorized =
            auth.role === UserRoles.ADMIN || resource.poster._id === auth.id;
    }

    const delResource = () => {
        dispatch(deleteResource(resource._id));
        navigate("/resources");
    };

    // Youtube only allows videos with embed to be played through a
    let embedLink = resource.resourceUrl.replace("watch?v=", "embed/");
    return (
        <div className="flex flex-col mt-4  mb-12 md:mt-16 space-y-5">
            <ResourceForm
                open={open}
                setOpen={setOpen}
                resource={resource}
                edit={true}
            />
            <ConfirmationModal
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={delResource}
            >
                Are you sure you want to delete this resource?
            </ConfirmationModal>
            <iframe
                className="aspect-video w-full mb-6"
                src={embedLink}
            ></iframe>
            <div className="mt-6 bg-neutral-50 px-4 py-6 rounded-xl relative">
                {isAuthorized && (
                    <div className="flex absolute sm:right-5 sm:top-10 bottom-3 right-3">
                        <div
                            title="Edit User"
                            onClick={() => setOpen(true)}
                            className="w-4 mr-2 transform hover:text-skyblue-200 hover:scale-110 cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </div>
                        <div
                            title="Delete User"
                            onClick={() => setConfirmOpen(true)}
                            className="w-4 mr-2 transform hover:text-red-400 hover:scale-110 cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </div>
                    </div>
                )}
                <p className="text-3xl text-neutral-500 mt-2 mb-12">
                    {resource.description}
                </p>
                <div className="flex space-y-2  mt-6 flex-col sm:flex-row sm:justify-between md:text-lg">
                    <div className="flex space-x-4 items-center  bg-darkblue-100 px-4 py-2 rounded-xl text-white">
                        {/* <img src={Clock} /> */}
                        <Clock />
                        <div>
                            {format(
                                new Date(resource.dateTime),
                                "dd-MM-yyyy  hh:mm",
                            )}
                        </div>
                    </div>
                    <div className="bg-darkblue-100 px-4 py-2 rounded-xl text-white">
                        Poster: {resource.poster.name}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YoutubePage;
