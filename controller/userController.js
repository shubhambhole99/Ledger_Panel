const db = require('../config/sqlconfig'); // Adjust the path accordingly

exports.getUsers = async (req,res) => {
    console.log("hello")
  try {
    // console.log(db)
    const [rows, fields] = await db.query('SELECT * FROM users');
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
exports.getUserById = async (req, res) => {
    const userId = req.params.id; // Get the user ID from the request parameters
    console.log(userId)
    try {
      const [rows, fields] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = rows[0];
      res.json(user);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  



// getUsers();