const http = require('node:http')
const fs = require('node:fs/promises')

const port = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1>Bienvenido a mi página de inicio</h1>')
  } else if (req.url === '/duck.png') {
    fs.readFile('./mini-duck.png')
      .then((data) => {
        res.setHeader('Content-Type', 'image/png')
        res.end(data) // un buffer es una clase global para trabajar con datos binarios
      })
      .catch(() => {
        res.statusCode = 500
        res.end('<h1>Internal Server Error</h1>')
      })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>404</h1>')
  }
})

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
