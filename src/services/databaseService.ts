import { verbose } from 'sqlite3'

import logger from './logger'

const sqlite3 = verbose()
const dbName = 'todoApp.db'

export function initializeDatabase() {
  const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
      logger.error(err.message)
    }

    logger.info(`Connected to the SQLite database: ${dbName}`)
  })

  return db
}

export function initializeTestDatabase() {
  const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      logger.error(err.message)
    }

    logger.info('Connected to the SQLite in-memory database')
  })

  return db
}
