const path = require('node:path')

// Barra separadora de directorios según el SO
console.log(path.sep)

// Unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'text.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const extension = path.extname(filePath)
console.log(extension)

const fileName = path.basename(filePath, extension)
console.log(fileName)
