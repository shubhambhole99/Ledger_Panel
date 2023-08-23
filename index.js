const express = require('express');
// const dbconnection = require("./config/sqlconfig");
// routes


const Item = require('./models/item');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const itemRoutes = require('./routes/itemRoutes');


// sequelize
const Sequelize = require('sequelize');
const config = require('./config/config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

console.log(dbConfig)

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect
});







const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/product', productRoutes);
app.use('/item', itemRoutes);

// const port=3000
// app.listen(port, () => {
//     console.table([
//         {
//             port: `${port}`
//         }
//     ])
// })


sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  });

module.exports = {sequelize,app};
