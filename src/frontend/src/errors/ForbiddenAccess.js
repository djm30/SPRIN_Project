// Error when a 403 is returned from the backend
export default class ForbiddenAccessError extends Error {
    constructor(message = "Not authrorized for this action", ...args) {
        super(message, ...args);
    }
}
