const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

let sequelize;
let isDbConnected = false;

try {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
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
    isDbConnected = true;
  } catch (error) {
    console.error('Database Connection Error (Running in Mock Mode):', error.message);
    isDbConnected = false;
  }
};

module.exports = { sequelize, connectDB, isDbConnected: () => isDbConnected };
