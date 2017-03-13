function createConfig() {
  const result = {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    version: process.env.API_VERSION || 'api',
    nodeEnv: process.env.NODE_ENV || 'development',
  }

  return `window.apiConfig = ${JSON.stringify(result)}`
}

module.exports = function configMiddleware() {
  return (req, res) => {
    res.header('Content-Type', 'text/javascript')
    res.send(createConfig())
  }
}
