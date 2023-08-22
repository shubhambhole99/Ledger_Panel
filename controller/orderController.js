const db = require('../config/sqlconfig'); // Adjust the path accordingly
const userController = require('../controller/userController')



exports.getOrders = async (req,res) => {
    console.log("hello")
  try {
    // console.log(db)
    const [rows, fields] = await db.query(`SELECT users.*, orders.*
    FROM orders
    LEFT JOIN users ON orders.user_id = users.id;`);
    console.log('Query results:', rows);
    return res.status(200).json({
        success: true,
        message: "user register succesfully",
        data: rows,
        // token: token
    })
  } catch (error) {
    console.error('Error executing query:', error);
    return res.status(200).json({
    message:"Failed"
    })
  }
};






exports.TotalEarningsOrders = async (req,res) => {
    console.log("hello")
  try {
    // console.log(db)
    const [rows, fields] = await db.query(`SELECT Sum(total_admin_earnings) from orders where delivery_status='delivered' and payment_status='paid'`);
    console.log('Query results:', rows);
    return res.status(200).json({
        success: true,
        message: "success",
        data: rows[0],
        // token: token
    })
  } catch (error) {
    console.error('Error executing query:', error);
    return res.status(200).json({
    message:"Failed"
    })
  }
};

// All order details
exports.ordersOfType = async (req,res) => {
   
    try {
    // All Products
   if(req.params.pid=='All'){
   let [rows, fields] = await db.query(`select *,orders.id from orders
   join order_items
   on orders.id=order_items.order_id
   join product_variations
   on order_items.product_variation_id=product_variations.id
   where orders.delivery_status='delivered' and orders.payment_status='paid'`)
    return res.status(200).json({
        success: true,
        message: "success",
        data: rows,
       
    })
   }
   // All Variations of Single Product
   if(req.params.id=="All"){
    let [rows, fields] = await db.query(`select *,orders.id from order_items
    join product_variations 
    on order_items.product_variation_id=product_variations.id
    join orders
    on orders.id=order_items.order_id
    where orders.delivery_status='delivered' and orders.payment_status='paid' and
    product_variations.product_id='${req.params.pid}'`)
    // console.log(rows)
    return res.status(200).json({
        success: true,
        message: "success",
        data: rows,
        // token: token
        })
    
   }
    // Single Variation of single product
    let [rows, fields] = await db.query(`select *,orders.id from order_items
    join product_variations 
    on order_items.product_variation_id=product_variations.id
    join orders
    on orders.id=order_items.order_id
    where orders.delivery_status='delivered' and orders.payment_status='paid' and
    product_variations.product_id='${req.params.pid}' and
    product_variations.variation_key='${req.params.id+'/'}'`);
    
    return res.status(200).json({
        success: true,
        message: "success",
        data: rows,
    })
  } catch (error) {
    console.error('Error executing query:', error);
    return res.status(200).json({
    message:"Failed"
    })
  }
};


// Price,Total Price,Revenue of Each Product Variation
exports.PriceOfType = async (req,res) => {
    console.log(req.params.pid)
    console.log(req.params.id)
    let rows=[]
    let fields=[]
    try {
    // All Products
   if(req.params.pid=='All'){
    [rows, fields] = await db.query(`select *,orders.id from orders
    join order_items
    on orders.id=order_items.order_id
    join product_variations
    on order_items.product_variation_id=product_variations.id
    where orders.delivery_status='delivered' and orders.payment_status='paid'`)

   }
    // All Variations of Single Product
   else if(req.params.id=="All"){
     [rows, fields] = await db.query(`select *,orders.id from order_items
    join product_variations 
    on order_items.product_variation_id=product_variations.id
    join orders
    on orders.id=order_items.order_id
    where orders.delivery_status='delivered' and orders.payment_status='paid' and
    product_variations.product_id='${req.params.pid}'`)
  
   
    }
    // Single Variation of single product
   else{
    
    [rows, fields] = await db.query(`select *,orders.id from order_items
    join product_variations 
    on order_items.product_variation_id=product_variations.id
    join orders
    on orders.id=order_items.order_id
    where orders.delivery_status='delivered' and orders.payment_status='paid' and
    product_variations.product_id='${req.params.pid}' and
    product_variations.variation_key='${req.params.id+'/'}'`);

}
let qty=0;
let price=0;
let actualprice=0;
let tax=0;
let check=0;
for(let i=0;i<rows.length;i++){
    qty+=rows[i].qty
    price+=rows[i].qty*(rows[i].unit_price-rows[i].total_tax);
    actualprice+=rows[i].total_price;
    check+=rows[i].total_admin_earnings;
    tax+=rows[i].qty*rows[i].total_tax;
}
obj={
    
    qty,
    price,
    tax,
    actualprice,
    // check,
}


console.log(obj)
return res.status(200).json({
    success: true,
    message: "success",
    data: obj,
    // token: token
})



  } catch (error) {
    console.error('Error executing query:', error);
    return res.status(200).json({
    message:"Failed"
    })
  }
};



// getUsers();