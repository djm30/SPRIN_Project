// Error for when a 401 is returned from the backend
export default class InvalidCredentialsError extends Error {
    constructor(message = "Incorrect Username or Password", ...args) {
        super(message, ...args);
    }
}
