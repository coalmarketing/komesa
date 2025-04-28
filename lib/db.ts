import { Pool } from 'pg';

// Kontrola, zda je k dispozici DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('Chybějící proměnná prostředí:');
  console.error('DATABASE_URL:', process.env.DATABASE_URL ? 'nastaveno' : 'chybí');
  console.error('NODE_ENV:', process.env.NODE_ENV);
  throw new Error('Chybí povinná proměnná prostředí DATABASE_URL pro databázi');
}

// Debugovací informace o připojovacím řetězci
const dbUrl = process.env.DATABASE_URL;
console.log('Debugging připojení:');
try {
  // Pokus o analýzu připojovacího řetězce (bez vypsání hesla)
  const urlObj = new URL(dbUrl);
  console.log('- Protokol:', urlObj.protocol);
  console.log('- Host:', urlObj.hostname);
  console.log('- Port:', urlObj.port || 'výchozí');
  console.log('- Uživatel:', urlObj.username);
  console.log('- Heslo:', urlObj.password ? '********' : 'neuvedeno');
  console.log('- Databáze:', urlObj.pathname.slice(1)); // odstranění počátečního lomítka
} catch (error: any) {
  console.error('Neplatný formát připojovacího řetězce:', error.message);
  console.error('DATABASE_URL musí být ve formátu: postgresql://uzivatel:heslo@host:port/databaze');
}

// Vytvoření pool pro PostgreSQL
console.log('Pokus o vytvoření databázového poolu...');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { 
    rejectUnauthorized: false 
  } : undefined
});

console.log('Database config: Používám DATABASE_URL pro připojení k PostgreSQL databázi');

// Test připojení při startu s více informacemi pro debugging
const testConnection = async () => {
  try {
    console.log('Attempting database connection...');
    console.log('Environment:', process.env.NODE_ENV);
    
    console.log('Získávání připojení...');
    const client = await pool.connect();
    console.log('Database connection successful');
    
    // Test jednoduchého dotazu
    console.log('Testovací dotaz...');
    const result = await client.query('SELECT 1');
    console.log('Test query successful:', result.rows);
    
    client.release();
  } catch (err: any) {
    console.error('Database connection failed:', err);
    console.error('Detail chyby:', err instanceof Error ? err.message : String(err));
    
    if (err.code) {
      console.error('Kód chyby:', err.code);
      // Popis běžných chyb
      const errorMessages: Record<string, string> = {
        ECONNREFUSED: 'Server odmítl připojení - zkontrolujte, zda server běží a je dostupný na dané adrese a portu',
        ETIMEDOUT: 'Připojení vypršelo - server je nedostupný nebo je problém s firewallem',
        '28P01': 'Nesprávné heslo pro uživatele',
        '28000': 'Neplatné přihlašovací údaje',
        '3D000': 'Databáze neexistuje',
        '42P01': 'Tabulka neexistuje'
      };
      
      if (errorMessages[err.code]) {
        console.error('Možná příčina:', errorMessages[err.code]);
      }
    }
    
    // V produkci nechceme shodit celou aplikaci
    if (process.env.NODE_ENV !== 'production') {
      throw err;
    }
  }
};

testConnection();

export default pool; 