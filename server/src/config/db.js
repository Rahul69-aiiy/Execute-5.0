const { Sequelize } = require('sequelize');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Raw pg Pool for direct queries
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

let sequelize;
let isDbConnected = false;

try {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  });
} catch (e) {
  console.log("Sequelize init failed (likely config issues), continuing with mock mode.");
}

const connectDB = async () => {
  try {
    if (!sequelize) return;
    await sequelize.authenticate();
    console.log('PostgreSQL Connected via Sequelize');
    
    // Test pg pool connection
    const client = await pool.connect();
    console.log('PostgreSQL Pool Connected');
    client.release();
    
    isDbConnected = true;
  } catch (error) {
    console.log();
    console.error('Database Connection Error (Running in Mock Mode):', error.message);
    isDbConnected = false;
  }
};

module.exports = { sequelize, pool, connectDB, isDbConnected: () => isDbConnected };
