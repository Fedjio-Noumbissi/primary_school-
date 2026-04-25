import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import { AppError } from '../middleware/errorHandler';

interface CrudOptions {
  tableName: string;
  primaryKey: string;
  searchFields?: string[];
  defaultSort?: string;
}

export const createCrudController = ({ tableName, primaryKey, searchFields = [], defaultSort = 'created_at DESC' }: CrudOptions) => {
  return {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const offset = (page - 1) * limit;
        const search = req.query.search as string;

        let query = `SELECT * FROM ${tableName}`;
        const queryParams: any[] = [];
        
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
        const [countRows]: any = await pool.query(countQuery, queryParams);
        const total = countRows[0].total;

        query += ` ORDER BY ${defaultSort} LIMIT ? OFFSET ?`;
        queryParams.push(limit, offset);

        const [rows] = await pool.query(query, queryParams);

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
      } catch (error) {
        next(error);
      }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const [rows]: any = await pool.query(`SELECT * FROM ${tableName} WHERE ${primaryKey} = ?`, [id]);
        
        if (rows.length === 0) {
          return next(new AppError(`${tableName} not found`, 404));
        }

        res.status(200).json({
          success: true,
          data: rows[0]
        });
      } catch (error) {
        next(error);
      }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body;
        
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map(() => '?').join(', ');

        const [result]: any = await pool.query(
          `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`,
          values
        );

        res.status(201).json({
          success: true,
          message: `${tableName} created successfully`,
          data: {
            [primaryKey]: result.insertId,
            ...data
          }
        });
      } catch (error) {
        next(error);
      }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const data = req.body;

        if (Object.keys(data).length === 0) {
          return res.status(400).json({ success: false, message: 'Nothing to update' });
        }

        const setClauses = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = Object.values(data);
        values.push(id);

        const [result]: any = await pool.query(
          `UPDATE ${tableName} SET ${setClauses} WHERE ${primaryKey} = ?`,
          values
        );

        if (result.affectedRows === 0) {
          return next(new AppError(`${tableName} not found`, 404));
        }

        res.status(200).json({
          success: true,
          message: `${tableName} updated successfully`,
        });
      } catch (error) {
        next(error);
      }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const [result]: any = await pool.query(`DELETE FROM ${tableName} WHERE ${primaryKey} = ?`, [id]);

        if (result.affectedRows === 0) {
          return next(new AppError(`${tableName} not found`, 404));
        }

        res.status(200).json({
          success: true,
          message: `${tableName} deleted successfully`
        });
      } catch (error) {
        next(error);
      }
    }
  };
};

import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';

export const createCrudRouter = (options: CrudOptions) => {
  const router = Router();
  const controller = createCrudController(options);

  router.route('/')
    .get(protect, controller.getAll)
    .post(protect, controller.create);

  router.route('/:id')
    .get(protect, controller.getById)
    .put(protect, controller.update)
    .patch(protect, controller.update)
    // Using delete method safely
    .delete(protect, controller.delete);

  return router;
};
