const db = require("../src/database");

module.exports = () => {
  return new Promise((resolve, reject) => {
    // Assuming `db` is accessible to close the connection, adjust as needed
    db.close((err) => {
      if (err) reject(err);
      resolve();
    });
  });
};
