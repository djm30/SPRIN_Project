import { useState } from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

// All custom react hooks for the application

/**
 *
 * @desc Handles state and error message for a text field
 *  input all in one function
 * @param {*} validationFunction Function that will validate the value and return an error message
 * @param {*} additionalInputParameters Any additional parameters that can modify an input tag e.g. maxLength
 */
export const useTextField = (
    validationFunction,
    additionalInputParameters = {},
) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
        setError(validationFunction(event.target.value));
    };

    const reset = (value = "") => {
        setValue(value);
        setError("");
    };

    const isValid = () => {
        setError(validationFunction(value));
        let upToDateError = validationFunction(value);
        return upToDateError === "";
    };

    const inputParams = {
        ...additionalInputParameters,
        value,
        onChange,
    };

    return [value, reset, error, isValid, inputParams];
};

// Retrieves the resource from the redux store based on the id in the url
export const useResource = () => {
    const resources = useSelector((state) => state.resources);
    const match = useMatch("/resources/:id");
    if (match) {
        return findInPage(resources, match.params.id);
    }
    return null;
};

// Retrieves the event from the redux store based on the id in the url
export const useEvent = () => {
    const events = useSelector((state) => state.events);
    const match = useMatch("/events/:id");
    if (match) {
        return findInPage(events, match.params.id);
    }
    return null;
};

// Finds an item in a list of pages based on the provided id
const findInPage = (pages, id) => {
    for (let page of pages) {
        for (let item of page) {
            if (item._id === id) {
                return item;
            }
        }
    }
    return null;
};

// Checks if the user is authorized to perform an action
export const useAuthorized = (...roles) => {
    const user = useSelector((state) => state.auth);
    if (!user) return false;
    for (let role of roles) {
        if (role === user.role) return true;
    }
    return false;
};
