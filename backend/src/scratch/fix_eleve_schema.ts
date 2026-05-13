import { pool } from '../config/db';

async function fixSchema() {
  try {
    console.log('Fixing Eleve table columns to allow NULL...');
    await pool.query('ALTER TABLE Eleve MODIFY COLUMN prenom varchar(60) NULL');
    await pool.query('ALTER TABLE Eleve MODIFY COLUMN dateNaissance date NULL');
    await pool.query('ALTER TABLE Eleve MODIFY COLUMN lieuNaissance varchar(30) NULL');
    await pool.query('ALTER TABLE Eleve MODIFY COLUMN idVilleNaissance int unsigned NULL');
    console.log('✅ Schema updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error updating schema:', err);
    process.exit(1);
  }
}

fixSchema();
