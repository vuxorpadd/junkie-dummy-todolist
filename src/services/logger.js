const pino = require('pino')

// Determine if logs should be pretty-printed
const prettyPrint = process.env.NODE_ENV === 'development'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  ...(prettyPrint && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: 'SYS:standard',
      },
    },
  }),
})

module.exports = logger
