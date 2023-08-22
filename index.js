const express = require('express');
// const dbconnection = require("./config/sqlconfig");
// routes
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/product', productRoutes);

const port=3000
app.listen(port, () => {
    console.table([
        {
            port: `${port}`
        }
    ])
})


module.exports = app;