"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.formatZodError = exports.AppError = void 0;
// Custom Error Class
class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
// Validation Error Formatter (for Zod)
const formatZodError = (err) => {
    return err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
    }));
};
exports.formatZodError = formatZodError;
// Global Error Handler
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    // Log to console for dev
    if (process.env.NODE_ENV !== 'production') {
        console.log(err);
    }
    // Zod Validation Error
    if (err.name === 'ZodError') {
        const message = 'Validation Error';
        return res.status(400).json({
            success: false,
            message,
            errors: (0, exports.formatZodError)(err),
        });
    }
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
            success: false,
            message: 'Duplicate field value entered',
        });
    }
    if (err.code === 'ER_NO_DEFAULT_FOR_FIELD') {
        return res.status(400).json({
            success: false,
            message: 'Missing required field',
        });
    }
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
    });
};
exports.errorHandler = errorHandler;
