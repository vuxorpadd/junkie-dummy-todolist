import { Router } from 'express'
import db from './database'

const router = Router()

// Get all todos
router.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({
      message: 'success',
      // data: rows,
      data: [],
    })
  })
})

// Add a new todo
router.post('/todos', (req, res) => {
  const { title } = req.body
  const completed = req.body.completed ? 1 : 0

  function action(err) {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.status(201).json({
      message: 'A new todo has been added',
      id: this.lastID,
    })
  }

  db.run('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, completed], action)
})

// Update a todo
router.patch('/todos/:id', (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body

  function action(err) {
    if (err) {
      res.status(400).json({ error: 'Something went wrong' })
      return
    }
    res.json({
      message: 'todo updated',
      changes: this.changes,
    })
  }

  db.run(`UPDATE todos SET title = ?, completed = ? WHERE id = ?`, [title, completed, id], action)
})

export default router
