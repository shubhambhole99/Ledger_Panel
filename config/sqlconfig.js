// const mysql= require('mysql2');

// var connection = mysql.createConnection({
//     port:"%",
//     host:"89.117.188.204",
//     user:"u266083227_dev_enmart",
//     password:"Burningtree@1996",
//     database:"u266083227_dev_enmart"
// });

// connection.connect((err)=>{
//     if(!err)
//     {
//         console.log("connected");
//     }
//     else
//     console.log(err);
// })

// module.exports = connection;



const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'u266083227_dev_enmart',
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