const db = require('../config/initializeDB');

const Expenses = db.Expenses;
const Purchases = db.Purchases;
const Item = db.Item;

// Controller method to add an expense, add new items if necessary, and create purchases
exports.addExpenseAndCreateItems=async(req, res)=>{
  const transaction = await db.sequelizeDB.transaction();

  try {
    const { date, bought_by, total_amount, purchases } = req.body;

    // Create the expense
    const expense = await Expenses.create(
      {
        date,
        bought_by,
        total_amount
      },
      { transaction }
    );

    // Loop through purchases and create items and associated purchases
    for (const purchase of purchases) {
      let item = await Item.findOne({
        where: { item_name: purchase.item },
        transaction
      });

      if (!item) {
        // If item doesn't exist, add it to the Item table
        item = await Item.create(
          {
            item_name: purchase.item,
          },
          { transaction }
        );
      }

      // Create the associated purchase
      await Purchases.create(
        {
          expense_id: expense.expense_id,
          item: purchase.item,
          quantity: purchase.quantity,
          price: purchase.price
        },
        { transaction }
      );
    }

    await transaction.commit();

    return res.status(201).json({ message: 'Expense added and items created/updated successfully' });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return res.status(500).json({ message: 'An error occurred while processing the expense and items' });
  }
}
