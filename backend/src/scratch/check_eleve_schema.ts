import { pool } from '../config/db';

async function checkSchema() {
  try {
    const [rows]: any = await pool.query('DESCRIBE Eleve');
    console.log('--- Eleve Schema ---');
    console.table(rows);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkSchema();
