const db = require('../config/db');


exports.getUserByOlmId = async (olmid) => {
  const query = 'SELECT * FROM signup WHERE olmid = ?';
  
  try {
    const [results] = await db.execute(query, [olmid]); 
    console.log("Login Credentials:", results[0]);

    if (results.length === 0) {
      return null;
    }

    return results[0]; 
  } catch (err) {
    console.error("Database Error:", err); 
    throw err; 
  }
};

