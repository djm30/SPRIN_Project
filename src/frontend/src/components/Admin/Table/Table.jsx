import React from "react";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { useSelector } from "react-redux";

export const Table = ({ editUser, deleteUser }) => {
    const users = useSelector((state) => state.users);
    return (
        <table className="min-w-max w-full table-auto overflow-x-scroll ">
            <TableHead />
            <tbody className="text-gray-600 text-sm font-light">
                {
                    // map users to table rows with every other row having alt set to true}
                    users.map((user, index) => (
                        <TableRow
                            key={user._id}
                            alt={index % 2 === 0}
                            user={user}
                            editUser={editUser}
                            deleteUser={deleteUser}
                        />
                    ))
                }
            </tbody>
        </table>
    );
};
