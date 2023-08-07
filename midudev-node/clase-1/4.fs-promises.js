const fs = require('node:fs/promises')

// Si el módulo no trae promesas:
// const fs = require("node:fs");
// const { promisify } = require("node:util")
// const readFile = promisify(fs.readFile)

console.log('>>> Reading file1')
fs.readFile('./file.txt', 'utf-8').then((text) =>
  console.log('file.txt:', text)
)

console.log('Other process')

console.log('>>> Reading file2')
fs.readFile('./file2.txt', 'utf-8').then((text) =>
  console.log('file2.txt:', text)
)
