const sql = require("mssql");
require("dotenv").config();
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function getConnection() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error("Database connection failed!", err);
    throw err;
  }
}

async function getWeatherReport(city, fromDate, toDate) {
  try {
    let pool = await getConnection();
    let result = await pool
      .request()
      .input("City", sql.VarChar, city)
      .input("FromDate", sql.DateTime, fromDate)
      .input("ToDate", sql.DateTime, toDate)
      .query(
        "SELECT * FROM db_owner.Wieland_fn_WeatherReport(@City, @FromDate, @ToDate)"
      );

    return result.recordset[0];
  } catch (err) {
    console.error("Error while querying the database:", err);
    throw err;
  }
}

module.exports = {
  getConnection,
  sql,
  getWeatherReport,
};
