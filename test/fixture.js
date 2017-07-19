const http = require('http')
const socketIo = require('socket.io')
const passportJwtSocketIo = require('../lib')

let server

exports.start = function start (jwtOptions, jwtVerify, callback) {
  server = http.createServer()

  const io = socketIo.listen(server)
  io.use(passportJwtSocketIo.authorize(jwtOptions, jwtVerify))

  io.sockets.on('echo', (m) => {
    io.sockets.emit('echo-response', m)
  })

  server.listen(7000, callback)
}

exports.stop = function stop (callback) {
  server.close()
  callback()
}
