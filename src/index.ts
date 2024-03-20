import app from './app'
import logger from './services/logger'

const PORT = process.env.PORT || 3000

// Listen on the specified port
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
