import ForbiddenAccessError from "../errors/ForbiddenAccess";
import InvalidRequestError from "../errors/InvalidRequest";
import InvalidCredentialsError from "../errors/InvalidCredentials";
import { AxiosError } from "axios";

export const errorHandler = (e) => {
    if (e instanceof AxiosError) {
        if (e.message.includes("403")) {
            return new ForbiddenAccessError();
        } else if (e.message.includes("400")) {
            return new InvalidRequestError(e.response.data);
        } else if (e.message.includes("401")) {
            return new InvalidCredentialsError();
        }
    }
    console.log(e);
    // throw new Error(e.message);
};
