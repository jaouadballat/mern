const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('../config/key');
const User = require('../models/User');


module.exports = function(passport) {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
       User.findById(jwt_payload._id, function(err, user) {
           if(err) return done(err, false);
           if(user) return done(null, user);
           else return done(null, false);
       })
    }))
}