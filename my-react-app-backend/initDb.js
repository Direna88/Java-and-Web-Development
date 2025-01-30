const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Database credentials
const DB_NAME = 'notes_app';
const DB_USER = process.env.PG_USER;
const DB_PASSWORD = process.env.PG_PASSWORD;
const DB_HOST = process.env.PG_HOST;
const DB_PORT = process.env.PG_PORT;

async function initializeDatabase() {
  const rootClient = new Client({
    user: DB_USER,
    host: DB_HOST,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  try {
    await rootClient.connect();

    // Check if the database exists
    const result = await rootClient.query(`SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}';`);

    if (result.rowCount === 0) {
      console.log(`Database "${DB_NAME}" does not exist. Creating...`);
      await rootClient.query(`CREATE DATABASE ${DB_NAME};`);
      console.log(`Database "${DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${DB_NAME}" already exists.`);
    }

    await rootClient.end();
  } catch (err) {
    console.error('Error creating database:', err);
    process.exit(1);
  }
}

async function createTables() {
  const dbClient = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  try {
    await dbClient.connect();

    await dbClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255),
        content VARCHAR(500),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log('Tables created successfully.');
    await dbClient.end();
  } catch (err) {
    console.error('Error creating tables:', err);
    process.exit(1);
  }
}

// Run the script
(async () => {
  await initializeDatabase();
  await createTables();
  console.log('Database setup complete.');
})();
