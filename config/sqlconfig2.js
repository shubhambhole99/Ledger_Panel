
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: '89.117.188.204',
  user: 'u266083227_feasibility',
  password: 'feasibility@1A',
  database: 'u266083227_feasibility',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get a connection from the pool
pool.getConnection((err, connection) => {
    if(!err)
        {
            console.log("connected");
        }
        else{
        console.log(err);
    }
});

module.exports = pool.promise();