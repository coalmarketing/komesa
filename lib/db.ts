import mysql, { PoolOptions } from 'mysql2/promise';

if (!process.env.MYSQL_URL) {
  console.error('Chybějící proměnné prostředí:');
  console.error('MYSQL_URL:', process.env.MYSQL_URL ? 'nastaveno' : 'chybí');
  console.error('NODE_ENV:', process.env.NODE_ENV);
  throw new Error('Chybí povinné proměnné prostředí pro databázi');
}

const config: PoolOptions = {
  uri: process.env.MYSQL_URL,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 5000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : undefined
};

console.log('Database config:', {
  uri: 'hidden for security',
  ssl: config.ssl ? 'enabled' : 'disabled'
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