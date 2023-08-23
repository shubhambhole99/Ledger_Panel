
const db = require('../config/initializeDB');




// Create a new item
exports.createItem= async (req, res) => {
  try {
    const { item_name, item_price,item_unit,item_qty } = req.body;
    console.log(db.Item)

    const newItem = await db.Item.create({ item_name, item_price,item_unit,item_qty });
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



