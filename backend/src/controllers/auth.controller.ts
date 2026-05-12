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
      'SELECT ID as id, nom, username, typeAdmin, actif, password FROM Admin WHERE username = ? AND actif = 1',
      [username]
    );

    if (rows.length === 0) {
      return next(new AppError('Invalid credentials', 401));
    }

    const admin = rows[0];

    // Verification du mot de passe en clair (selon la maquette)
    if (admin.password !== password) {
      return next(new AppError('Invalid credentials', 401));
    }

    // Map typeAdmin to roles
    // Example: 1 = fondateur, 2 = directeur, etc.
    let mappedRole = 'parent';
    if (admin.typeAdmin === 1) mappedRole = 'fondateur';
    else if (admin.typeAdmin === 2) mappedRole = 'directeur';
    else if (admin.typeAdmin === 3) mappedRole = 'admin_scolarite';
    else if (admin.typeAdmin === 4) mappedRole = 'admin_auditeur';
    else mappedRole = 'fondateur'; // Fallback for testing

    // Role-based permissions mapping
    let permissions: string[] = [];
    if (mappedRole === 'fondateur') permissions = ['dashboard', 'scolarite', 'finance', 'admin', 'routes', 'evaluations', 'audit'];
    else if (mappedRole === 'directeur') permissions = ['dashboard', 'scolarite', 'finance', 'admin', 'evaluations'];
    else if (mappedRole === 'admin_scolarite') permissions = ['dashboard', 'scolarite', 'evaluations'];
    else if (mappedRole === 'admin_auditeur') permissions = ['dashboard', 'audit'];
    else if (mappedRole === 'parent') permissions = ['parent_dashboard'];
    else if (mappedRole === 'enseignant') permissions = ['enseignant_dashboard', 'evaluations'];
    else if (mappedRole === 'administratif') permissions = ['administratif_dashboard', 'finance'];

    const tokenPayload = {
      sub: admin.id,
      username: admin.username,
      role: mappedRole
    };

    const token = jwt.sign(
      tokenPayload,
      (process.env.JWT_SECRET || 'fallback_secret') as string,
      { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as any }
    );

    // Prepare response user
    const responseUser = {
      id: admin.id,
      nom: admin.nom,
      username: admin.username,
      role: mappedRole,
      permissions
    };

    res.status(200).json({
      success: true,
      data: {
        token,
        user: responseUser
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
