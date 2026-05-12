import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export const getPermissions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM permissions_routes');
    res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    next(error);
  }
};

export const updatePermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { route, role, peut_acceder } = req.body;
    
    if (!route || !role) {
      return res.status(400).json({ success: false, message: 'La route et le rôle sont obligatoires' });
    }

    const valAcces = peut_acceder ? 1 : 0;
    
    // Check if exists
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM permissions_routes WHERE route = ? AND role = ?', [route, role]);
    
    if (rows.length > 0) {
      // Update
      await pool.query('UPDATE permissions_routes SET peut_acceder = ? WHERE route = ? AND role = ?', [valAcces, route, role]);
    } else {
      // Insert
      await pool.query('INSERT INTO permissions_routes (route, role, peut_acceder) VALUES (?, ?, ?)', [route, role, valAcces]);
    }

    res.status(200).json({ success: true, message: 'Permission mise à jour avec succès' });
  } catch (error) {
    next(error);
  }
};

export const deletePermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { route, role } = req.params;
    await pool.query('DELETE FROM permissions_routes WHERE route = ? AND role = ?', [route, role]);
    res.status(200).json({ success: true, message: 'Permission supprimée' });
  } catch (error) {
    next(error);
  }
};
