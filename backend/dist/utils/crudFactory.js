"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrudRouter = exports.createCrudController = void 0;
const db_1 = require("../config/db");
const errorHandler_1 = require("../middleware/errorHandler");
const createCrudController = ({ tableName, primaryKey, searchFields = [], defaultSort = 'created_at DESC' }) => {
    return {
        getAll: async (req, res, next) => {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 20;
                const offset = (page - 1) * limit;
                const search = req.query.search;
                let query = `SELECT * FROM ${tableName}`;
                const queryParams = [];
                if (search && searchFields.length > 0) {
                    const conditions = searchFields.map(field => `${field} LIKE ?`).join(' OR ');
                    query += ` WHERE ${conditions}`;
                    const searchParam = `%${search}%`;
                    for (let i = 0; i < searchFields.length; i++) {
                        queryParams.push(searchParam);
                    }
                }
                let countQuery = `SELECT COUNT(*) as total FROM ${tableName}`;
                if (search && searchFields.length > 0) {
                    const conditions = searchFields.map(field => `${field} LIKE ?`).join(' OR ');
                    countQuery += ` WHERE ${conditions}`;
                }
                const [countRows] = await db_1.pool.query(countQuery, queryParams);
                const total = countRows[0].total;
                query += ` ORDER BY ${defaultSort} LIMIT ? OFFSET ?`;
                queryParams.push(limit, offset);
                const [rows] = await db_1.pool.query(query, queryParams);
                res.status(200).json({
                    success: true,
                    data: rows,
                    pagination: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit) || 1
                    }
                });
            }
            catch (error) {
                next(error);
            }
        },
        getById: async (req, res, next) => {
            try {
                const { id } = req.params;
                const [rows] = await db_1.pool.query(`SELECT * FROM ${tableName} WHERE ${primaryKey} = ?`, [id]);
                if (rows.length === 0) {
                    return next(new errorHandler_1.AppError(`${tableName} not found`, 404));
                }
                res.status(200).json({
                    success: true,
                    data: rows[0]
                });
            }
            catch (error) {
                next(error);
            }
        },
        create: async (req, res, next) => {
            try {
                const data = req.body;
                const keys = Object.keys(data);
                const values = Object.values(data);
                const placeholders = keys.map(() => '?').join(', ');
                const [result] = await db_1.pool.query(`INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`, values);
                res.status(201).json({
                    success: true,
                    message: `${tableName} created successfully`,
                    data: {
                        [primaryKey]: result.insertId,
                        ...data
                    }
                });
            }
            catch (error) {
                next(error);
            }
        },
        update: async (req, res, next) => {
            try {
                const { id } = req.params;
                const data = req.body;
                if (Object.keys(data).length === 0) {
                    return res.status(400).json({ success: false, message: 'Nothing to update' });
                }
                const setClauses = Object.keys(data).map(key => `${key} = ?`).join(', ');
                const values = Object.values(data);
                values.push(id);
                const [result] = await db_1.pool.query(`UPDATE ${tableName} SET ${setClauses} WHERE ${primaryKey} = ?`, values);
                if (result.affectedRows === 0) {
                    return next(new errorHandler_1.AppError(`${tableName} not found`, 404));
                }
                res.status(200).json({
                    success: true,
                    message: `${tableName} updated successfully`,
                });
            }
            catch (error) {
                next(error);
            }
        },
        delete: async (req, res, next) => {
            try {
                const { id } = req.params;
                const [result] = await db_1.pool.query(`DELETE FROM ${tableName} WHERE ${primaryKey} = ?`, [id]);
                if (result.affectedRows === 0) {
                    return next(new errorHandler_1.AppError(`${tableName} not found`, 404));
                }
                res.status(200).json({
                    success: true,
                    message: `${tableName} deleted successfully`
                });
            }
            catch (error) {
                next(error);
            }
        }
    };
};
exports.createCrudController = createCrudController;
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const createCrudRouter = (options) => {
    const router = (0, express_1.Router)();
    const controller = (0, exports.createCrudController)(options);
    router.route('/')
        .get(authMiddleware_1.protect, controller.getAll)
        .post(authMiddleware_1.protect, controller.create);
    router.route('/:id')
        .get(authMiddleware_1.protect, controller.getById)
        .put(authMiddleware_1.protect, controller.update)
        .patch(authMiddleware_1.protect, controller.update)
        // Using delete method safely
        .delete(authMiddleware_1.protect, controller.delete);
    return router;
};
exports.createCrudRouter = createCrudRouter;
