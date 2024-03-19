const sqlite3 = require('sqlite3').verbose()
const logger = require('../../logger')

const dbName = 'todoApp.db'

function initializeDatabase() {
  const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
      logger.error(err.message)
    }

    logger.info(`Connected to the SQLite database: ${dbName}`)
  })

  return db
}

function initializeTestDatabase() {
  const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      logger.error(err.message)
    }

    logger.info('Connected to the SQLite in-memory database')
  })

  return db
}

module.exports = {
  initializeDatabase,
  initializeTestDatabase,
}
