export default class InvalidCredentialsError extends Error {
    constructor(message = "Incorrect Username or Password", ...args) {
        super(message, ...args);
    }
}
