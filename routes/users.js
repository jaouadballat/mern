var express = require('express');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
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
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({email}, function(err, user) {
    if(!user) return res.json({msg: 'Email does not exit'});
    user.comparPassword(password, function(err, isMatch) {
      if(err) throw err;
      if(!isMatch) return res.json({msg: 'Password Incorrect'});
      res.json({user});
    });
  });
});

module.exports = router;
