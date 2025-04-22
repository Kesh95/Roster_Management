const db = require('../config/db'); // adjust if your DB file is named differently

const getUserByOlm = (olmid, callback) => {
    const sql = "SELECT * FROM signup WHERE olmid = ?";
    db.query(sql, [olmid], callback);
};

module.exports = { getUserByOlm };
