const db = require("../../src/database");

// Helper function to promisify the SQLite run method
function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

async function createTables() {
  await runAsync(
    `CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    )`,
  );
}

async function createToDoItem(params) {
  const result = await runAsync(
    "INSERT INTO todos (title, completed) VALUES (?, ?)",
    [params.title, params.completed],
  );

  return {
    id: result.lastID,
  };
}

async function updateToDoItem(params) {
  await runAsync("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [
    params.title,
    params.completed,
    params.id,
  ]);
}

async function removeToDoItem(id) {
  await runAsync("DELETE FROM todos WHERE id = ?", [id]);
}

async function removeAllToDoItems() {
  await runAsync("DELETE FROM todos");
}

async function getAllToDoItems() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM todos", [], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function getToDoItem(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM todos WHERE id = ?", [id], (err, row) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = {
  createTables,
  createToDoItem,
  updateToDoItem,
  removeToDoItem,
  removeAllToDoItems,
  getAllToDoItems,
  getToDoItem,
};
