
const Item = require('../models/item');



// Create a new item
exports.createItem= async (req, res) => {
  try {
    const { itemName, price } = req.body;
    
    const newItem = await Item.create({ itemName, price });
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



