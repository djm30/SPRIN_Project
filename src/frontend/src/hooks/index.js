import { useState } from "react";

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

  const reset = () => {
    setValue("");
    setError("");
  };

  const isValid = () => {
    return error === "";
  };

  const inputParams = {
    ...additionalInputParameters,
    value,
    onChange,
  };

  return [value, reset, error, isValid, inputParams];
};
