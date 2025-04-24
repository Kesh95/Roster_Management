const db = require('../config/db');

exports.findUserByOlmId = (olmid) => {
  console.log("➡️ In Model: received OLM ID:", olmid); // Debug log

  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM signup WHERE olmid = ?", [olmid.trim()], (err, results) => {
      if (err) {
        console.error("❌ DB Query Error:", err);  // Log the error
        return reject(err);
      }
      console.log("✅ DB Query Success:", results); // Log the results
      resolve(results);
    });
  });
};