import React from "react";
import { useDispatch } from "react-redux";
import { approveUser } from "../../../reducers/userReducer";

const TableRow = ({ alt, user, editUser, deleteUser }) => {
    const bgColor = alt ? "bg-gray-50" : "";

    const dispatch = useDispatch();

    const approve = (e) => {
        if (!user.approved) {
            // console.log("Approving user: ", user._id);
            dispatch(approveUser(user._id));
        }
    };

    return (
        <tr
            className={`border-b border-gray-200 ${bgColor} hover:bg-gray-100 text-base`}
        >
            {/* EMAIL */}
            <td className="py-5 px-8 text-left whitespace-nowrap">
                <div className="flex items-center">
                    <span className="font-medium">{user.email}</span>
                </div>
            </td>
            {/*  NAME */}
            <td className="py-5 px-8 text-left">
                <div className="flex items-center">
                    <span>{user.name}</span>
                </div>
            </td>

            {/* STATUS */}
            <td
                className="py-5 px-8 text-center cursor-pointer select-none"
                title="Approve User"
                onClick={approve}
            >
                <span
                    className={` ${
                        user.approved
                            ? "text-purple-600 bg-purple-200"
                            : "bg-red-200 text-red-600"
                    } py-1 px-3 rounded-full text-xs`}
                >
                    {user.approved ? "Approved" : "Not Approved"}
                </span>
            </td>

            {/* ROLE */}
            <td className="py-5 px-8 text-left">
                <p className="text-center">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
            </td>
            {/* ACTIONS */}
            <td className="py-5 px-8 text-center">
                <div className="flex item-center justify-center">
                    {/* <div className="w-4 mr-2 transform hover:text-skyblue-200 hover:scale-110">
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
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                    </div> */}
                    <div
                        title="Edit User"
                        onClick={() => editUser(user)}
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
                        onClick={() => deleteUser(user)}
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
            </td>
        </tr>
    );
};

export default TableRow;
