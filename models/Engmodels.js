const db = require('../config/db'); // or wherever your DB connection is

exports.getDetailsByOlmid = (olmid) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT olmid FROM signup WHERE olmid = ?', [olmid], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
// exports.findByOlmid = (olmid) => {
//   return new Promise((resolve, reject) => {
//     console.log('Model: findByOlmid - START - Searching for OLM ID:', olmid);
//     db.query('SELECT username, olmid, contact_no, lob, team FROM signup WHERE olmid = ?', [olmid], (err, results) => {
//       console.log('Model: findByOlmid - CALLBACK');
//       if (err) {
//         console.error('Model: findByOlmid - ERROR:', err);
//         return reject(err);
//       }
//       console.log('Model: findByOlmid - RESULTS:', results);
//       resolve(results[0]);
//     });
//   });
// };

exports.findByOlmid = async (olmid) => {
  try {
    const [results] = await db.execute('SELECT username, olmid, contact_no, lob, team FROM signup WHERE olmid = ?', [olmid]);
    if (results.length > 0) {
      return results[0]; // Return the first row if found
    } else {
      return null; // Or throw an error:  throw new Error('User not found');
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};