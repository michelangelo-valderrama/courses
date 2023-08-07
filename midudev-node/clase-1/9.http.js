const http = require('node:http')
const { findAvaliablePort } = require('./10.free-port')

const port = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hello, wolrd')
})

findAvaliablePort(port).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
  })
})
