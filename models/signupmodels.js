const db = require('../config/db');

exports.insertUser = async (user) => {
  const { username, olmid, contact_no, gender, lob, team, role, pass } = user;
  const state = 'active'; // default state value

  const query = `
    INSERT INTO signup
    (username, olmid, contact_no, gender, lob, team,  pass,role, state) 
    VALUES (?, ?, ?, ?, ?, ?, ?,?,?)
  `;

  try {
    const [result] = await db.execute(query, [
      username, olmid, contact_no, gender, lob, team, pass, role, state
    ]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};