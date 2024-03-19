const sqlite3 = require('sqlite3').verbose()

const dbName = 'todoApp.db'

function initializeDatabase() {
  const db = new sqlite3.Database(dbName, () => {
    console.log('Connected to the SQLite database.')
  })

  return db
}

function initializeTestDatabase() {
  const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      console.error(err.message)
    }
    console.log('Connected to the SQLite database.')
  })

  return db
}

module.exports = {
  initializeDatabase,
  initializeTestDatabase,
}
