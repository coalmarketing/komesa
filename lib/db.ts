import mysql, { PoolOptions } from 'mysql2/promise';

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  console.error('Chybějící proměnné prostředí:');
  console.error('DB_HOST:', process.env.DB_HOST ? 'nastaveno' : 'chybí');
  console.error('DB_USER:', process.env.DB_USER ? 'nastaveno' : 'chybí');
  console.error('DB_NAME:', process.env.DB_NAME ? 'nastaveno' : 'chybí');
  console.error('NODE_ENV:', process.env.NODE_ENV);
  throw new Error('Chybí povinné proměnné prostředí pro databázi');
}

const config: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 5000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
};

console.log('Database config:', {
  host: config.host,
  user: config.user,
  database: config.database
});

// Vytvoření poolu s explicitním typem
const pool = mysql.createPool(config);

// Test připojení při startu s více informacemi pro debugging
const testConnection = async () => {
  try {
    console.log('Attempting database connection...');
    console.log('Environment:', process.env.NODE_ENV);
    
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    
    // Test jednoduchého dotazu
    const [result] = await connection.query('SELECT 1');
    console.log('Test query successful:', result);
    
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err);
    // V produkci nechceme shodit celou aplikaci
    if (process.env.NODE_ENV !== 'production') {
      throw err;
    }
  }
};

testConnection();

export default pool; 