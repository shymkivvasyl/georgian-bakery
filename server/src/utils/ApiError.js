// An error with an HTTP status code.
// Throw it in a controller: throw ApiError.notFound('...')
export class ApiError extends Error {
  constructor(statusCode, message, errors) {
    // Let Error save the message and the stack (where the error happened)
    super(message);
    this.statusCode = statusCode;
    // Optional details, e.g. the list of problems from Zod
    this.errors = errors;
  }

  // Short ways to create common errors
  static badRequest(message, errors) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message) {
    return new ApiError(401, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }

  static notFound(message) {
    return new ApiError(404, message);
  }
}
