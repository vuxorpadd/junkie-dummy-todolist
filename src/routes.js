const router = require('express').Router()

const db = require('./database')

// Get all todos
router.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.json({
      message: 'success',
      data: rows,
    })
  })
})

// Add a new todo
router.post('/todos', (req, res) => {
  const { title } = req.body
  const completed = req.body.completed ? 1 : 0
  db.run('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, completed], function (err) {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }
    res.status(201).json({
      message: 'A new todo has been added',
      id: this.lastID,
    })
  })
})

// Update a todo
router.patch('/todos/:id', (req, res) => {
  const { id } = req.params
  const { title, completed } = req.body
  db.run(`UPDATE todos SET title = ?, completed = ? WHERE id = ?`, [title, completed, id], function (err) {
    if (err) {
      res.status(400).json({ error: res.message })
      return
    }
    res.json({
      message: 'todo updated',
      changes: this.changes,
    })
  })
})

module.exports = router
