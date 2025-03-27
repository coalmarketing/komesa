import mysql, { PoolOptions } from 'mysql2/promise';

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  throw new Error('Chybí povinné proměnné prostředí pro databázi');
}

const config: PoolOptions = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',  // prázdné heslo pro XAMPP
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
  enableKeepAlive: true
};

// Vytvoření poolu s explicitním typem
const pool = mysql.createPool(config);

// Test připojení při startu
pool.getConnection()
  .then(connection => {
    console.log('Database connection successful');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

export default pool; 