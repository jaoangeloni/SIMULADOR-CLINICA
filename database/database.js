require('dotenv').config();

const Sequelize = require('sequelize');

const database = new Sequelize(
    process.env.DATABASE_NAME, 
    process.env.DATABASE_USER, 
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: process.env.DATABASE_DIALECT,
        timezone: process.env.DATABASE_TIMEZONE
    });

module.exports = database;