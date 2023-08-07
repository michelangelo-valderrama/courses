// Top Level Await usando ESM
// import { readFile } from "node:fs/promises";

// console.log(">>> Reading file1");
// const text = await readFile("./file.txt", "utf-8");
// console.log("file.txt:", text);

// console.log("Other process");

// console.log(">>> Reading file2");
// const text2 = await readFile("./file2.txt", "utf-8");
// console.log("file2.txt:", text2);

const { readFile } = require('node:fs/promises');

(async () => {
  const text = await readFile('./file.txt', 'utf-8')
  console.log('file.txt:', text)

  console.log('Other process')

  const text2 = await readFile('./file2.txt', 'utf-8')
  console.log('file2.txt:', text2)
})()
