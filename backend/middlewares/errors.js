const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err };
        error.message = err.message

        // wrong mongoose object id error
        if (err.name === 'CastError') {
            const message = `Resource not found, invalid ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }

        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys
                (err.keyValue)} entered, there is already an user with that email address`;
            error = new ErrorHandler(message, 400)
        }

        if (err.name === 'JsonWebTokenError') {
            const message = `Json web token is invalid. Please try again👋`;
            error = new ErrorHandler(message, 400)
        }

        if (err.name === 'TokenExpiredError') {
            const message = `Json web token is expired. Please try again👋`;
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'InternaL Server Error'
        })
    }
}