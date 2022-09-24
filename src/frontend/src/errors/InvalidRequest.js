export default class InvalidRequestError extends Error {
  constructor(message = "Malformed request", ...args) {
    super(message, ...args);
  }
}
