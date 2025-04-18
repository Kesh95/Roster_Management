const db = require('../config/db');


exports.getUserByOlmId = async (olmid) => {
  const query = 'SELECT * FROM signup WHERE olmid = ?';
  
  try {
    const [results] = await db.execute(query, [olmid]); // Use db.execute for the query
    console.log("Database query results:", results);  // Log query result

    if (results.length === 0) {
      return null;  // No user found
    }

    return results[0];  // Return the first user
  } catch (err) {
    console.error("Database Error:", err);  // Log DB error
    throw err;  // Rethrow the error
  }
};

