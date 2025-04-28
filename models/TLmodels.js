const db = require('../config/db');

exports.findUserByOlmId = (olmid) => {
  console.log("➡️ In Model: received OLM ID:", olmid);

  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM signup WHERE olmid = ?", [olmid.trim()], (err, results) => {
      if (err) {
        console.error("❌ DB Query Error:", err);  
        return reject(err);
      }
      console.log("✅ DB Query Success:", results); 
      resolve(results);
    });
  });
};