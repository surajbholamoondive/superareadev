import pino from 'pino'

const logLevelData = {
  '*': 'info',
}

const logLevels = new Map(Object.entries(logLevelData))

export function getLogLevel(logger) {
  return logLevels.get(logger) || logLevels.get('*')
}

export function getLogger(name) {
  return pino({
    name,
    level: process.env.NODE_ENV === 'development' ? 'debug' : getLogLevel(name),
  })
}