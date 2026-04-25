import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { AppError } from '../middleware/errorHandler';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(1, 'Password is required'), // Some local systems use simple passwords
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const [rows]: any = await pool.query(
      'SELECT * FROM Admin WHERE username = ? AND actif = 1',
      [username]
    );

    if (rows.length === 0) {
      return next(new AppError('Invalid credentials', 401));
    }

    const admin = rows[0];

    // Assuming plain text passwords as user hasn't clarified.
    // If bcrypt is needed later, we can add: await bcrypt.compare(password, admin.password);
    if (admin.password !== password) {
      return next(new AppError('Invalid credentials', 401));
    }

    const token = jwt.sign(
      { id: admin.ID, role: 'admin' },
      (process.env.JWT_SECRET || 'fallback_secret') as string,
      { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any }
    );

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

  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }

    const [rows]: any = await pool.query(
      'SELECT ID, nom, username, actif, typeAdmin, mobile, alanyaID, created_at FROM Admin WHERE ID = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};
