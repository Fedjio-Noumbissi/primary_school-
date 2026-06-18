import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import { eleveSchema, eleveUpdateSchema } from '../validators/eleve.validator';
import { AppError } from '../middleware/errorHandler';

export const getEleves = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const search = req.query.search as string;

    let query = 'SELECT * FROM Eleve';
    const queryParams: any[] = [];
    
    if (search) {
      query += ' WHERE nom LIKE ? OR prenom LIKE ? OR matricule LIKE ?';
      const searchParam = `%${search}%`;
      queryParams.push(searchParam, searchParam, searchParam);
    }
    
    // Total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM Eleve';
    if (search) {
      countQuery += ' WHERE nom LIKE ? OR prenom LIKE ? OR matricule LIKE ?';
    }
    const [countRows]: any = await pool.query(countQuery, queryParams);
    const total = countRows[0].total;

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const [rows] = await pool.query(query, queryParams);

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getEleveById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [rows]: any = await pool.query(`
      SELECT e.*, v.libelle as nomVilleNaissance 
      FROM Eleve e 
      LEFT JOIN VilleNaissance v ON e.idVilleNaissance = v.idVille 
      WHERE e.matricule = ?
    `, [id]);
    
    if (rows.length === 0) {
      return next(new AppError('Eleve not found', 404));
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const createEleve = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idAdmin = req.user?.id || 1; 
    const validatedData = eleveSchema.parse(req.body);
    // Generate matricule automatically: YYXXXX (e.g. 240001)
    const year = new Date().getFullYear() % 100; // 24
    const prefix = year * 10000; // 240000
    const [maxRows]: any = await pool.query(
      'SELECT MAX(matricule) as maxM FROM Eleve WHERE matricule >= ? AND matricule < ?', 
      [prefix, prefix + 10000]
    );
    const maxM = maxRows[0].maxM;
    const nextM = maxM ? maxM + 1 : prefix + 1;

    // Filter out null/undefined/empty values
    const data: Record<string, any> = { 
      idAdmin,
      matricule: nextM
    };
    for (const [key, val] of Object.entries(validatedData)) {
      if (val !== null && val !== undefined && val !== '') {
        data[key] = val;
      }
    }

    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');

    await pool.query(
      `INSERT INTO Eleve (${keys.join(', ')}) VALUES (${placeholders})`,
      values
    );

    res.status(201).json({
      success: true,
      message: 'Eleve created successfully',
      data: {
        ...data
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateEleve = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = eleveUpdateSchema.parse(req.body);

    if (Object.keys(validatedData).length === 0) {
      return res.status(400).json({ success: false, message: 'Nothing to update' });
    }

    let updateQuery = 'UPDATE Eleve SET ';
    const queryParams: any[] = [];
    const setClauses: string[] = [];

    for (const [key, value] of Object.entries(validatedData)) {
      setClauses.push(`${key} = ?`);
      queryParams.push(value);
    }

    updateQuery += setClauses.join(', ') + ' WHERE matricule = ?';
    queryParams.push(id);

    const [result]: any = await pool.query(updateQuery, queryParams);

    if (result.affectedRows === 0) {
      return next(new AppError('Eleve not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Eleve updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEleve = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [result]: any = await pool.query('DELETE FROM Eleve WHERE matricule = ?', [id]);

    if (result.affectedRows === 0) {
      return next(new AppError('Eleve not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Eleve deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
