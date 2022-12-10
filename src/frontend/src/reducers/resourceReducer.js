import { createSlice } from "@reduxjs/toolkit";
import {
    getResources,
    createResource as createResourceRequest,
    updateResource as updateResourceRequest,
    deleteResource as deleteResourceRequest,
} from "../services/resourceService";
import { setNotification } from "./notificationReducer";

// An array of arrays, each inner array will have a max length of 9
let initialState = [];

const resourceSlice = createSlice({
    name: "resources",
    initialState,
    reducers: {
        setResources(state, action) {
            return action.payload;
        },
        addResource(state, action) {
            // Checking if last page is full and if so, creating a new page
            if (state[state.length - 1].length === 9) {
                state.push([action.payload]);
                // Pushing resource to last page if its not full
            } else {
                state[state.length - 1].push(action.payload);
            }
        },
        replaceResource(state, action) {
            const resourceToReplace = action.payload;
            state.forEach((page) => {
                page.map((resource) =>
                    resource._id === resourceToReplace._id
                        ? resourceToReplace
                        : resource,
                );
            });
        },
        removeResource(state, action) {
            const id = action.payload;
            state.forEach((page) => {
                page.filter((resource) => resource._id !== id);
            });
        },
    },
});

const { setResources, addResource, replaceResource, removeResource } =
    resourceSlice.actions;

export const initializeResources = () => {
    return async (dispatch) => {
        try {
            const resources = await getResources();
            resources.sort((first, second) => {
                return new Date(second.dateTime) - new Date(first.dateTime);
            });

            const pages = [];
            let currPage = [];
            for (let i = 0; i < resources.length; i++) {
                if (currPage.length === 9) {
                    pages.push(currPage);
                    currPage = [];
                }
                currPage.push(resources[i]);
            }
            pages.push(currPage);
            dispatch(setResources(pages));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

export const newResource = (resource) => {
    return async (dispatch) => {
        try {
            const newResource = await createResourceRequest(resource);
            dispatch(addResource(newResource));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

export const updateResource = (id, resource) => {
    return async (dispatch) => {
        try {
            const updatedResource = await updateResourceRequest(id, resource);
            dispatch(replaceResource(updatedResource));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

export const deleteResource = (id) => {
    return async (dispatch) => {
        try {
            await deleteResourceRequest(id);
            dispatch(removeResource(id));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

export default resourceSlice.reducer;
