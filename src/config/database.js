require('dotenv').config();

module.exports = {
  dialect: 'mssql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: false,
  },
  options: {
    tdsVersion: '7_3_B',
  },
};
