import ForbiddenAccessError from "../errors/ForbiddenAccess";
import InvalidRequestError from "../errors/InvalidRequest";
import InvalidCredentialsError from "../errors/InvalidCredentials";
import { AxiosError } from "axios";

// Single point of error handling for all functions
// Will take an error object and return a custom more descriptive error
export const errorHandler = (e) => {
    if (e instanceof AxiosError) {
        if (e.message.includes("403")) {
            return new ForbiddenAccessError();
        } else if (e.message.includes("400")) {
            return new InvalidRequestError(e.response.data.message);
        } else if (e.message.includes("401")) {
            return new InvalidCredentialsError();
        }
    }
    console.log(e);
    // throw new Error(e.message);
};
