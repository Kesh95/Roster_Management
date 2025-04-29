const db = require('../config/db'); 
exports.getUserByOlmIdforTl = async (olmid) => {
  try {
    const [results] = await db.execute('SELECT * FROM signup WHERE olmid = ?', [olmid]);
    return results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.updateUserStateToResign = async (olmid) => {
  try {
    const [results] = await db.execute('UPDATE signup SET state = ? WHERE olmid = ?', ['resign', olmid]);
    return results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.fetchAllEngineers = async () => {
  return await db.execute(
    'SELECT username,olmid,contact_no,gender,lob, team FROM signup WHERE role = "Eng" AND state = "active"'
  );
};

