const app = require('./app')
const logger = require('../logger')

const PORT = process.env.PORT || 3000

// Listen on the specified port
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
