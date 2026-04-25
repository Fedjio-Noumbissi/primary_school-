import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function initDB() {
  console.log('Starting Database Initialization...');
  try {
    // 1. Connect without database to ensure creating the database if not exists
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true,
    });

    const dbName = process.env.DB_NAME || 'eduprime_db';
    console.log(`Connecting to Server... Automatically creating Database "${dbName}" if missing.`);
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);

    // 2. Read the SQL Schema logic
    const schemaPath = path.join(__dirname, 'config', 'schema.sql');
    console.log(`Reading SQL Schema from ${schemaPath}...`);
    
    // We remove completely empty lines or split smartly, but multipleStatements: true handles the whole string!
    const sql = fs.readFileSync(schemaPath, 'utf8');

    // 3. Execute
    console.log('Executing tables creation and seeding Admin...');
    await connection.query(sql);

    console.log('✅ Database Initialization Complete! Tables built and `admin@ecole.fr` seeded.');
    await connection.end();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error during Database Initialization:');
    console.error(error);
    process.exit(1);
  }
}

initDB();
