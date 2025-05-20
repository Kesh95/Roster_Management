const db = require('../config/db'); // or wherever your DB connection is

exports.getDetailsByOlmid = (olmid) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT olmid FROM signup WHERE olmid = ?', [olmid], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.findByOlmid = async (olmid) => {
  try {
    const [results] = await db.execute('SELECT username, olmid, contact_no, lob, team FROM signup WHERE olmid = ?', [olmid]);
    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.insertMultipleLeaves = (values) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO leavedata (olmid, startdate, enddate, reason, status) VALUES ?`;
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("DB insert error:", err);
        return reject(err);
      }
      console.log("Inserted leave data:", result);
      resolve(result);
    });
  });
};