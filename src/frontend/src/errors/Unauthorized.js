export default class UnauthorizedError extends Error {
  constructor(message = "Invalid Credentials Provided", ...args) {
    super(message, ...args);
  }
}
