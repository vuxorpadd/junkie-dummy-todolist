import express from 'express'
import bodyParser from 'body-parser'
import router from './routes'

const app = express()

app.use(bodyParser.json())

app.use('/api', router)

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, _next) => {
  if (err) {
    res.status(500).json({ error: err.message })
  }
})

export default app
