require('dotenv').config();
const fs = require('fs');

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username:     process.env.DATABASE_USER, 

    password: process.env.DATABASE_PASSWORD,
    database:     process.env.DATABASE_NAME, 

    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username:     process.env.DATABASE_USER, 

    password: process.env.DATABASE_PASSWORD,
    database:     process.env.DATABASE_NAME, 

    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,

  }
};