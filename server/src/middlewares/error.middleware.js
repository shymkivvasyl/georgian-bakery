import { ApiError } from '../utils/ApiError.js';

// Catches all errors from all routes.
// Express knows it is an error handler because it has 4 parameters
export function errorMiddleware(err, _req, res, _next) {
  // Expected error (our ApiError): send its status and message
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message, errors: err.errors });
  }

  // Unexpected error (bug, database down): log details for us,
  // but do not show them to the client
  console.error(err);

  return res.status(500).json({ message: 'Internal server error' });
}
