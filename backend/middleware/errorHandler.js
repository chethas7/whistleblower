const errorHandler = (err, req, res, next) => {
  console.error("ERROR 💥", err.stack || err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = errorHandler;
