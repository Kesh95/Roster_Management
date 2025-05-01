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
exports.addleaveUser=async (user) =>{
  const {olmid,startdate,enddate,reason} = user;
  console.log('Olmid of engineer who is applying for leave',olmid);
  const status = 'pending'; 
  const query = `
    INSERT INTO leavedata
    (olmid,startdate,enddate,reason,status) 
    VALUES (?, ?, ?, ?, ?)
  `;
  try {
    const [result] = await db.execute(query, [
      olmid,startdate,enddate,reason,status
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};