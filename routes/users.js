var express = require('express');
var router = express.Router();
const passport = require('passport');
const _ = require('lodash');

const User = require('../models/User');
const registerValidation = require('../validation/registerValidation');
const loginValidation = require('../validation/loginValidation');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {

  //Register Validation
  const errors  = registerValidation(req.body);
  if(!_.isEmpty(errors)) return res.json({ errors })


    User.findOne({email: req.body.email}, function(err, user) {
      if(user) return res.status(400).json({
        msg: 'Email Already exist'
      });
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
      });

      newUser.gravatar(req.body.email);
      newUser.save(function(err, user) {
        if(err)  throw(err);
        return res.status(200).json({
          user
        });
      });
    });
});

router.post('/login', function(req, res, next) {

  //Login Validation
  const errors = loginValidation(req.body);
  if(!_.isEmpty(errors)) return res.json({ errors })

  let email = req.body.email;
  let password = req.body.password;
  User.findOne({email}, function(err, user) {
    if(!user) return res.json({msg: 'Email does not exit'});
    user.comparPassword(password, function(err, isMatch) {
      if(err) throw err;
      if(!isMatch) return res.json({msg: 'Password Incorrect'});
      let token = user.generateToken();
      res.json({token: 'Bearer ' + token});
    });
  });
});

router.get('/current', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});

module.exports = router;
