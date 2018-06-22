const express = require('express');
const router = express.Router();
const passport = require('passport');
const _ = require('lodash');

const Profile = require('../models/Profile');
const profileValidation = require('../validation/profileValidation');

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    Profile.findById(req.user._id)
    .populate({path:'user', select: ['name', 'avatar']})
    .exec(function (err, profile) {
        if (err) throw err;
        if (!profile) return res.status(404).json({ error: 'There is no profile for this user' });
        return res.status(200).json({ profile });
    });
});

router.get('/handle/:handle', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    Profile.findOne({handle: req.params.handle})
        .populate({ path: 'user', select: ['name', 'avatar'] })
        .exec(function (err, profile) {
            if (err) throw err;
            if (!profile) return res.status(404).json({ error: 'There is no profile for this user' });
            return res.status(200).json({ profile });
        });
});

router.get('/user/:user_id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    Profile.findById(req.params.user_id)
        .populate({ path: 'user', select: ['name', 'avatar'] })
        .exec(function (err, profile) {
            if (err) throw err;
            if (!profile) return res.status(404).json({ error: 'There is no profile for this user' });
            return res.status(200).json({ profile });
        });
});


router.get('/all', function(req, res, next) {
    Profile.find()
        .populate({path: 'users', select: ['email', 'name']})
        .exec(function(err, profiles) {
            if(err) throw err;
            return res.json({profiles});
        });
});

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    const errors = profileValidation(req.body);
    if(!_.isEmpty(errors)) return res.json({ errors });

        console.log(req.body);

    let profileField = {};
     profileField.user = req.user;
    if (req.body.handle) profileField.handle = req.body.handle;
    if (req.body.company) profileField.company = req.body.company;
    if (req.body.website) profileField.website = req.body.website;
    if (req.body.location) profileField.location = req.body.location;
    if (req.body.status) profileField.status = req.body.status;
    if (req.body.bio) profileField.bio = req.body.bio;
    if (req.body.githubUserName) profileField.githubUserName = req.body.githubUserName;
    if (req.body.skills) profileField.skills = req.body.skills.split(',');
    profileField.socials = {}
    if (req.body.youtube) profileField.socials.youtube = req.body.youtube;
    if (req.body.facebook) profileField.socials.facebook = req.body.facebook;
    if (req.body.instagram) profileField.socials.instagram = req.body.instagram;
    if (req.body.tweeter) profileField.socials.tweeter = req.body.tweeter;
    if (req.body.linkden) profileField.socials.linkden = req.body.linkden;

    Profile.findByIdAndUpdate({ _id: req.user._id }, 
        profileField , { upsert: true, new: true},
        function(err, profile) {
            if(err) throw err;
            return res.json(profile);
        });

});

module.exports = router;