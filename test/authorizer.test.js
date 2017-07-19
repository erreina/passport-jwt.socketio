const io = require('socket.io-client')
const jwt = require('jsonwebtoken')
const ExtractJwt = require('passport-jwt').ExtractJwt
const fixture = require('./fixture')

const secret = 'secret'
const validUser = 'validUser'
const invalidUser = 'invalidUser'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: secret
}

function jwtVerify (jwtPayload, done) {
  if (jwtPayload.user && jwtPayload.user === validUser) {
    return done(null, jwtPayload.user)
  }
  return done(new Error('Invalid token'), null)
}

describe('authorizer', () => {
  // start and stop the server
  before((callback) => {
    fixture.start(jwtOptions, jwtVerify, callback)
  })
  after(fixture.stop)

  describe('when the JWT is not present', () => {
    it('should emit error with no auth token', (done) => {
      const socket = io.connect('http://localhost:7000', { 'force new connection': true })
      socket.on('error', (error) => {
        error.should.eql('Error: No auth token')
        done()
      })
    })
  })

  describe('when the JWT is present', () => {
    describe('when the token is not valid', () => {
      it('should emit error with invalid token', (done) => {
        const token = jwt.sign({ user: invalidUser }, secret)
        const socket = io('http://localhost:7000', {
          forceNew: true,
          query: { token }
        })
        socket.connect()
        socket.on('error', (error) => {
          error.should.eql('Invalid token')
          done()
        })
      })
    })

    describe('when the token is valid', () => {
      it('should do the handshake and connect', (done) => {
        const token = jwt.sign({ user: validUser }, secret)
        const socket = io('http://localhost:7000', {
          forceNew: true,
          query: { token }
        })
        socket.connect()
        socket.on('connect', () => {
          done()
        }).on('error', done)
      })
    })
  })
})
