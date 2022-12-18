// Error for when a 400 is returned from the backend
export default class InvalidRequestError extends Error {
    constructor(message = "Malformed request", ...args) {
        super(message, ...args);
    }
}
