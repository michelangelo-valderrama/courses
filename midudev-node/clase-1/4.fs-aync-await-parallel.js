const { readFile } = require('node:fs/promises')

Promise.all([
  readFile('file.txt', 'utf-8'),
  readFile('file2.txt', 'utf-8')
]).then(([text, text2]) => {
  console.log('file.txt:', text)
  console.log('file2.txt:', text2)
})
