"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = void 0;
const db_1 = require("../config/db");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("../middleware/errorHandler");
const loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, 'Username must be at least 3 characters'),
    password: zod_1.z.string().min(1, 'Password is required'), // Some local systems use simple passwords
});
const login = async (req, res, next) => {
    try {
        const { username, password } = loginSchema.parse(req.body);
        const [rows] = await db_1.pool.query('SELECT * FROM Admin WHERE username = ? AND actif = 1', [username]);
        if (rows.length === 0) {
            return next(new errorHandler_1.AppError('Invalid credentials', 401));
        }
        const admin = rows[0];
        // Assuming plain text passwords as user hasn't clarified.
        // If bcrypt is needed later, we can add: await bcrypt.compare(password, admin.password);
        if (admin.password !== password) {
            return next(new errorHandler_1.AppError('Invalid credentials', 401));
        }
        const token = jsonwebtoken_1.default.sign({ id: admin.ID, role: 'admin' }, (process.env.JWT_SECRET || 'fallback_secret'), { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') });
        // Remove password from response
        delete admin.password;
        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                user: admin,
                token
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const getMe = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new errorHandler_1.AppError('Not authenticated', 401));
        }
        const [rows] = await db_1.pool.query('SELECT ID, nom, username, actif, typeAdmin, mobile, alanyaID, created_at FROM Admin WHERE ID = ?', [req.user.id]);
        if (rows.length === 0) {
            return next(new errorHandler_1.AppError('User not found', 404));
        }
        res.status(200).json({
            success: true,
            data: rows[0],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
