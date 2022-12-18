import { createSlice } from "@reduxjs/toolkit";
import {
    getUsers,
    approveUser as approverUserRequest,
    createUser as createUserRequest,
    updateUser as updateUserRequest,
    deleteUser as deleteUserRequest,
} from "../services/userService";
import { setNotification } from "./notificationReducer";
import { incrementStats } from "./statsReducer";
import statTypes from "../services/StatTypes";

let initialState = [];

// Reducer for users
// Contains the state of all users
// Contains the actions for updating the state of all users
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action) {
            return action.payload;
        },
        addUser(state, action) {
            return [...state, action.payload];
        },
        replaceUser(state, action) {
            const userToReplace = action.payload;
            return state.map((user) =>
                user._id === userToReplace._id ? userToReplace : user,
            );
        },
        removeUser(state, action) {
            const id = action.payload;
            return state.filter((user) => user._id !== id);
        },
    },
});

const { setUsers, addUser, replaceUser, removeUser } = userSlice.actions;

// Action for fetching all users from the backend
export const initializeUsers = () => {
    return async (dispatch) => {
        try {
            const users = await getUsers();
            dispatch(setUsers(users));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

// Action for creating a new user
export const registerUser = (user) => {
    return async (dispatch) => {
        try {
            const newUser = await createUserRequest(user);
            dispatch(addUser(newUser));
            // Setting notification and incrementing stats upon successful user creation
            dispatch(setNotification("User created successfully", false));
            dispatch(incrementStats(statTypes.USERS));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

// Action for approving a user
export const approveUser = (id) => {
    return async (dispatch) => {
        try {
            const updatedUser = await approverUserRequest(id);
            dispatch(replaceUser(updatedUser));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

// Action for updating a user
export const updateUser = (id, user) => {
    return async (dispatch) => {
        try {
            const updatedUser = await updateUserRequest(id, user);
            dispatch(replaceUser(updatedUser));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

// Action for deleting a user
export const deleteUser = (id) => {
    return async (dispatch) => {
        try {
            await deleteUserRequest(id);
            dispatch(removeUser(id));
        } catch (e) {
            console.log(e);
        }
    };
};

export default userSlice.reducer;
