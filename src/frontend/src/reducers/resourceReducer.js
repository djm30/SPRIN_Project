import { createSlice } from "@reduxjs/toolkit";
import {
    getResources,
    createResource as createResourceRequest,
    updateResource as updateResourceRequest,
    deleteResource as deleteResourceRequest,
} from "../services/resourceService";
import { setNotification } from "./notificationReducer";
import { incrementStats } from "./statsReducer";
import statTypes from "../services/statTypes";

// An array of arrays, each inner array will have a max length of 9
let initialState = [];

// Reducer for resources
// Contains the state of all resources
// Contains the actions for updating the state of all resources
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

// Action for fetching all resources from the backend
export const initializeResources = () => {
    return async (dispatch) => {
        try {
            const resources = await getResources();
            resources.sort((first, second) => {
                return new Date(second.dateTime) - new Date(first.dateTime);
            });

            // Splitting resources into pages of 9
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

// Action for creating a new resource
export const newResource = (resource) => {
    return async (dispatch) => {
        try {
            const newResource = await createResourceRequest(resource);
            dispatch(addResource(newResource));
            // Setting notification and incrementing stats
            dispatch(setNotification("Resource created!", false));
            dispatch(incrementStats(statTypes.RESOURCES));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

// Action for updating a resource
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

// Action for deleting a resource
export const deleteResource = (id) => {
    return async (dispatch) => {
        try {
            await deleteResourceRequest(id);
            dispatch(removeResource(id));
            dispatch(setNotification("Resource deleted!"));
        } catch (e) {
            dispatch(setNotification(e.message, true));
        }
    };
};

export default resourceSlice.reducer;
