import db from '../../src/database'
import { TodoItem } from '../../src/types/common.types'

// Helper function to promisify the SQLite run method
function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    function action(err) {
      if (err) {
        reject(err)
      } else {
        resolve(this)
      }
    }

    db.run(sql, params, action)
  })
}

export async function createTables() {
  await runAsync(
    `CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    )`,
  )
}

// create todo item and return result
export async function createToDoItem(params): Promise<Partial<TodoItem>> {
  return new Promise((resolve, reject) => {
    function action(err) {
      if (err) {
        reject(err)
      } else {
        resolve({ id: this.lastID })
      }
    }

    db.run('INSERT INTO todos (title, completed) VALUES (?, ?)', [params.title, params.completed], action)
  })
}

export async function updateToDoItem(params) {
  await runAsync('UPDATE todos SET title = ?, completed = ? WHERE id = ?', [params.title, params.completed, params.id])
}

export async function removeToDoItem(id) {
  await runAsync('DELETE FROM todos WHERE id = ?', [id])
}

export async function removeAllToDoItems() {
  await runAsync('DELETE FROM todos')
}

export async function getAllToDoItems(): Promise<TodoItem[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM todos', [], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows as TodoItem[])
      }
    })
  })
}

export async function getToDoItem(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}
