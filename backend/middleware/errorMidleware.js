const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404).json({
        message: error.message
    });
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    let message = err.message;

    // Additional check for unexpected errors
    if (!statusCode) {
        statusCode = 500;
        message = "Internal Server Error";
    }

    res.status(statusCode).json({
        message,
    });
};

export { notFound, errorHandler }
