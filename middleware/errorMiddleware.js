const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    // Log error for server-side debugging
    console.error(`[Error] ${req.method} ${req.originalUrl}: ${err.message}`);
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }

    res.json({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method
    });
};

module.exports = { notFound, errorHandler };
