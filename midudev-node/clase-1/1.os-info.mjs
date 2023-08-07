import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os'

console.log('System Operation Info')
console.log('---------------------')

console.log('Name:', platform())
console.log('Version:', release())
console.log('Arquitecture:', arch())
console.log('CPUs:', cpus())
console.log('Free Memory', freemem() / 1024 / 1024)
console.log('Total Memory', totalmem() / 1024 / 1024)
console.log('Uptime', uptime() / 3600)
