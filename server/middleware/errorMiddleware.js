// Custom catch-all error middleware message 
const notFound = (request, response, next) => {
  const error = new Error(`Not Found - ${request.originalUrl}`);
  response.status(404);
  next(error);
};

// Test to see if we cause error in our routes with our custom error middleware
const errorHandler = (err, request, response, next) => {
  let statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  let message = err.message;

  // Test if Mongoose specific error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Error, resources not found.";
  }

  // Set a status for the error message and stack trace if in development
  response.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };