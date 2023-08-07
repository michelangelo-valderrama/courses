import { readFile } from 'node:fs'

console.log('>>> Reading file1')
readFile('./file.txt', 'utf-8', (err, text) => {
  console.log(text)
})

console.log('Other process')

console.log('>>> Reading file2')
readFile('./file2.txt', 'utf-8', (err, text) => {
  console.log(text)
})
