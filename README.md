# passport-jwt.socketio

[![Build Status](https://api.travis-ci.org/erreina/passport-jwt.socketio.svg?branch=master)](https://travis-ci.org/erreina/passport-jwt.socketio)
[![npm dependency status](https://david-dm.org/erreina/passport-jwt.socketio.svg)](https://david-dm.org/erreina/passport-jwt.socketio)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A [Socket.IO](https://socket.io/) middleware for authenticating with a [JSON Web Token](http://jwt.io) based on [passport-jwt](https://github.com/themikenicholson/passport-jwt).

This module lets you authenticate socket.io endpoints using a JSON web token. It is
intended to be used to secure endpoints without sessions.

## Example usage


```javascript
// Initialize our modules
const io = require('socket.io')(server)
const passportJwtSocketIo = require('passport-jwt.socketio')

// set the passport-jwt options
const options = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: secret
}

// define the verify callback
function verify(jwtPayload, done) {
  // token is valid 
  // we still can verify the token

  // the user passed is set to socket.request.user
  done(null, user)
}


// set the authorization middleware
io.use(passportJwtSocketIo.authorize(options, verify))

```

## Tests

    npm install
    npm test

## Inspiration

* [passport.socketio](https://github.com/jfromaniello/passport.socketio)

## Contribute

You are always welcome to open an issue or provide a pull-request!

## License

The [MIT License](http://opensource.org/licenses/MIT)
