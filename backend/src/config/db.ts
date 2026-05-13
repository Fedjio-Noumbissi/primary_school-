import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school',
  waitForConnections: true,
  connectionLimit: 20,        // Plus de connexions simultanées
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000, // Ping toutes les 10s
  connectTimeout: 60000,        // 60s pour connexion initiale (serveur distant)
  namedPlaceholders: false,
});

// Gestion des erreurs de pool pour éviter les crashs
(pool as any).on?.('error', (err: any) => {
  console.warn('⚠️  Pool error (connexion perdue, reconnexion auto):', err.code);
});

// Helper to check DB connection with retry
export async function checkDBConnection(retries = 3): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const connection = await pool.getConnection();
      console.log('✅ Connected to MySQL database');
      connection.release();
      return;
    } catch (err: any) {
      console.warn(`⚠️  DB connection attempt ${attempt}/${retries} failed:`, err.message);
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 3000 * attempt)); // backoff exponentiel
      }
    }
  }
  console.warn('⚠️  Could not connect to MySQL after retries. Will retry on next request.');
}
