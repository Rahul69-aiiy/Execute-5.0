const { Client } = require('pg');
require('dotenv').config();

const setupDatabase = async () => {
    console.log(`Attempting to connect with User: ${process.env.DB_USER}`);
    
    // Connect to 'postgres' default database to create the new one
    const client = new Client({
        user: process.env.DB_USER || "postgres",
        host: process.env.DB_HOST || "localhost",
        password: process.env.DB_PASSWORD || "your_password",
        database: process.env.DB_NAME || "piyushdb", // Connect to default DB first
        port: process.env.DB_PORT || 5432,
    });

    try {
        await client.connect();
        console.log("Connected to PostgreSQL successfully.");

        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`);
        
        if (res.rowCount === 0) {
            console.log(`Database ${process.env.DB_NAME} not found. Creating...`);
            await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
            console.log(`Database ${process.env.DB_NAME} created successfully!`);
        } else {
            console.log(`Database ${process.env.DB_NAME} already exists.`);
        }
    } catch (err) {
        console.error("Setup Failed:", err.message);
        if (err.message.includes("password authentication failed")) {
            console.error("\n❌ ERROR: Incorrect Password.");
            console.error("👉 Please open 'server/.env' and update DB_PASS with your actual PostgreSQL password.");
        }
    } finally {
        await client.end();
    }
};

setupDatabase();
