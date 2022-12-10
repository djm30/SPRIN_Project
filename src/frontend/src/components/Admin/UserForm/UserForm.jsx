import React, { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import TextField from "../../UI/TextField";
import RadioButtons from "../../Events/RadioButtons";
import UserRoles from "../../../services/UserRoles";
import { useTextField } from "../../../hooks";
import { useDispatch } from "react-redux";
import { setNotification } from "../../../reducers/notificationReducer";
import { updateUser } from "../../../reducers/userReducer";

const UserForm = ({ open, setOpen, user }) => {
    if (!user) return null;
    const [userRole, setUserRole] = useState(user.role);

    const userRoleValues = [
        { value: UserRoles.USER, label: "User" },
        { value: UserRoles.ADMIN, label: "Admin" },
    ];

    const [name, nameReset, nameError, isNameValid, nameInputParams] =
        useTextField(() => true);

    const [email, emailReset, emailError, isEmailValid, emailInputParams] =
        useTextField(() => true);

    useEffect(() => {
        nameReset(user.name);
        emailReset(user.email);
    }, [user]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!isNameValid() || !isEmailValid()) return;
        console.log("submit");
    };

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            className="mx-4 w-[600px] h-fit px-3 sm:px-6 py-4 overflow-hidden font-body  -translate-y-2"
        >
            <h3 className="text-lg text-center mx-2 md:text-2xl text-darkblue-100 font-bold">
                Create An Event
            </h3>
            <form
                onSubmit={(e) => {
                    onSubmit(e);
                }}
                className="mt-10 md:space-y-3"
            >
                {/* Event Title */}
                <TextField inputParams={nameInputParams} error={nameError}>
                    User Name
                </TextField>
                {/* Event Description */}
                <TextField inputParams={emailInputParams} error={emailError}>
                    User Email
                </TextField>
                {/* EVENT TYPE RADIAL BUTTONS */}

                {/* DIFFERENT FORM DEPENDING ON WHAT RESOURCE HAS BEEN CHOSEN */}
                <RadioButtons
                    value={userRole}
                    setValue={setUserRole}
                    info={userRoleValues}
                >
                    User Role
                </RadioButtons>

                {/* SUBMIT BUTTON */}
                <div className="mx-2">
                    <button className="w-full mt-4 bg-darkblue-100 text-white px-4 py-3 rounded-lg hover:bg-skyblue-200 transition-all">
                        Update User
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UserForm;
