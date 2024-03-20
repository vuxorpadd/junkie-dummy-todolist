import { initializeDatabase, initializeTestDatabase } from './services/databaseService'

const db = process.env.NODE_ENV === 'test' ? initializeTestDatabase() : initializeDatabase()

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER DEFAULT 0
    )`)
})

export default db
