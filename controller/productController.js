const db = require('../config/sqlconfig'); // Adjust the path accordingly

    exports.getAllProducts = async (req,res) => {
        console.log("hello")
      try {
        // console.log(db)
        const [rows, fields] = await db.query(`SELECT products.name, product_variations.*
        FROM products
        LEFT JOIN product_variations ON products.id = product_variations.product_id;`);
        
        
        
        const groupedResults = {};

    for (const result of rows) {
    const productName = result.name;
    if (!groupedResults[productName]) {
    groupedResults[productName] = [];
    }
    groupedResults[productName].push(result);
    }
    // console.log(groupedResults);
        
        return res.status(200).json({
            success: true,
            message: "success",
            data: groupedResults,
            // token: token
        })
      } catch (error) {
        console.error('Error executing query:', error);
        return res.status(200).json({
        message:"Failed"
        })
      }
    };


// // what product
// exports.products = async (req,res) => {
//     console.log("hello")
//     const [rows, fields] = await db.query(`SELECT id,name FROM u266083227_dev_enmart.products;`);
//     console.log(rows)
//     return res.status(500);

// }


// // what variation
// exports.category = async (req,res) => {
//     console.log("hello")
//     const [rows, fields] = await db.query(`SELECT id FROM u266083227_dev_enmart.products where name=${req.body.name};`);
//     const [rows1]=await db.query(`SELECT * FROM u266083227_dev_enmart.product_variations where product=${rows[0]};`);
//     return res.status(500);
// }