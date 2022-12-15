// Error for when a 401 is returned from the backend
export default class UnauthorizedError extends Error {
    constructor(message = "Invalid Credentials Provided", ...args) {
        super(message, ...args);
    }
}
