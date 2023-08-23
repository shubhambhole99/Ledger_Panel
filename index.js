const express = require('express');
// const dbconnection = require("./config/sqlconfig");
// routes

const db = require('./config/initializeDB');
const Item = require('./models/item');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const itemRoutes = require('./routes/itemRoutes');
const expenseRoutes = require('./routes/expenseRoutes');


const port = process.env.PORT || 9001;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/product', productRoutes);
app.use('/item', itemRoutes);
app.use('/expense', expenseRoutes);



app.use("/",(req,res)=>{
    res.json({message:port})
    // console.log(port)
})

async function bootServer() {
    try {
      const mysql = await db.sequelizeDB;
      await mysql.sync();
      app.listen(port, () => {
        console.log(`Listening on: http://localhost:${port}`);
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  bootServer();

module.exports = app;
