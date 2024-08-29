const mysql = require("mysql2");
require("dotenv").config();
const util = require("util");
const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 20,
  waitForConnections: true,
  multipleStatements: true,
  queueLimit: 0,
};

let pool = mysql.createPool(options);

pool.on("connection", function (connection) {
  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

pool.on("error", function (err) {
  console.error("Database connection error:", err);
  if (err.fatal) {
    pool.end(() => {
      console.log("Pool was closed. Recreating after a delay.");
      setTimeout(() => {
        pool = mysql.createPool(options);
      }, 10000); // wait 10 seconds before trying to recreate
    });
  }
});

const query = util.promisify(pool.query).bind(pool);

process.on("SIGINT", () => {
  pool.end((err) => {
    if (err) {
      console.error("Error closing the database connection:", err);
    } else {
      console.log("Database connection pool closed.");
    }
    process.exit(err ? 1 : 0);
  });
});

module.exports = { query };
