import { pool } from './src/config/db';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  try {
    const password = 'login4';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if user exists
    const [rows]: any = await pool.query('SELECT * FROM Admin WHERE username = ?', ['login4@ecole.fr']);
    if (rows.length > 0) {
      console.log('User login4@ecole.fr already exists. Updating password...');
      await pool.query('UPDATE Admin SET password = ? WHERE username = ?', [hashedPassword, 'login4@ecole.fr']);
      console.log('Password updated successfully!');
    } else {
      console.log('Creating user login4@ecole.fr...');
      // INSERT into Admin
      await pool.query(
        'INSERT INTO Admin (nom, username, password, typeAdmin, actif) VALUES (?, ?, ?, ?, ?)',
        ['Login 4 Admin', 'login4@ecole.fr', hashedPassword, 1, 1]
      );
      console.log('User created successfully!');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin();
