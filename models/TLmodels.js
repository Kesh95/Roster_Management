const db = require('../config/db'); 
exports.getDetailsByOlmid = (olmid) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT olmid FROM signup WHERE olmid = ?', [olmid], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.getUserByOlmIdforTl = async (olmid) => {
  try {
    const [results] = await db.execute('SELECT * FROM signup WHERE olmid = ?', [olmid]);
    return results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.updateEngineer = (originalOlmId, data) => {
  const {
    username,
    olmid,
    gender,
    contact_no,
    lob,
    team,
    role,
    pass
  } = data;
console.log(data);
  const query = `
    UPDATE signup 
    SET username = ?, olmid = ?, gender = ?, contact_no = ?, lob = ?, team = ?, role = ?, pass = ?
    WHERE olmid = ?
  `;

  const values = [
    username,
    olmid,
    gender,
    contact_no,
    lob,
    team,
    role,
    pass,
    originalOlmId
  ];

  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
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

