import mysql, { PoolOptions } from 'mysql2/promise';

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
  throw new Error('Chybí povinné proměnné prostředí pro databázi');
}

const config: PoolOptions = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 5000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  ssl: {
    rejectUnauthorized: true,
    // Některé databázové služby mohou vyžadovat další SSL nastavení
    minVersion: 'TLSv1.2'
  }
};

// Vytvoření poolu s explicitním typem
const pool = mysql.createPool(config);

// Test připojení při startu s více informacemi pro debugging
const testConnection = async () => {
  try {
    console.log('Attempting database connection...');
    console.log('Host:', process.env.DB_HOST);
    console.log('Database:', process.env.DB_NAME);
    console.log('User:', process.env.DB_USER);
    
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