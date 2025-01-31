const errorHandler = (err) => {
    const message = err.message || 'Something went wrong';
    const statusCode = err.statusCode || 500;
    return { message, statusCode };
  };
  
  module.exports = errorHandler;
  