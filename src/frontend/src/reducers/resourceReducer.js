import { createSlice } from "@reduxjs/toolkit";
import {
  getResources,
  createResource as createResourceRequest,
  updateResource as updateResourceRequest,
  deleteResource as deleteResourceRequest,
} from "../services/resourceService";

let initialState = [];

const resourceSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    setResources(state, action) {
      return action.payload;
    },
    addResource(state, action) {
      return [...state, action.payload];
    },
    replaceResource(state, action) {
      const resourceToReplace = action.payload;
      return state.map((resource) =>
        resource._id === resourceToReplace._id ? resourceToReplace : resource,
      );
    },
    removeResource(state, action) {
      const id = action.payload;
      return state.filter((resource) => resource._id !== id);
    },
  },
});

const { setResources, addResource, replaceResource, removeResource } =
  resourceSlice.actions;

export const initializeResources = () => {
  return async (dispatch) => {
    try {
      const resources = await getResources();
      dispatch(setResources(resources));
    } catch (e) {
      console.log(e);
    }
  };
};

export const newResource = (resource) => {
  return async (dispatch) => {
    try {
      const newResource = await createResourceRequest(resource);
      dispatch(addResource(newResource));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateResource = (id, resource) => {
  return async (dispatch) => {
    try {
      const updatedResource = await updateResourceRequest(id, resource);
      dispatch(replaceResource(updatedResource));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteResource = (id) => {
  return async (dispatch) => {
    try {
      await deleteResourceRequest(id);
      dispatch(removeResource(id));
    } catch (e) {
      console.log(e);
    }
  };
};

export default resourceSlice.reducer;
