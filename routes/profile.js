const express = require('express');
const router = express.Router();
const passport = require('passport');
const _ = require('lodash');

const Profile = require('../models/Profile');
const User = require('../models/User');

const profileValidation = require('../validation/profileValidation');
const experienceValidation = require('../validation/experienceValidation');
const educationValidation = require('../validation/educationValidation');

router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    Profile.findById(req.user._id)
    .populate({path:'user', select: ['name', 'avatar']})
    .exec(function (err, profile) {
        if (err) throw err;
        if (!profile) return res.json({ error: 'There is no profile for this user' });
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

router.post('/experience', passport.authenticate('jwt', { session: false }), function(req, res, next) {

    const errors = experienceValidation(req.body);

    if(!_.isEmpty(errors)) return res.json({errors});
    
    Profile.findById(req.user._id, function(err, profile) {
        if(err) throw err;
        newExperience = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        }

        profile.experience.unshift(newExperience);
        profile.save(function(err, profile) {
            if(err) throw err;
            return res.json({profile});
        });
    });
});


router.post('/education', passport.authenticate('jwt', { session: false }), function(req, res, next) {

    const errors = educationValidation(req.body);

    if(!_.isEmpty(errors)) return res.json({errors});

    Profile.findById(req.user._id, function(err, profile) {
        if(err) throw err;
        const education = {
            school : req.body.school,
            degree : req.body.degree,
            field : req.body.field,
            from : req.body.from,
            to : req.body.to,
            current : req.body.current,
            description : req.body.description,
        }
        profile.education.unshift(education);
        profile.save(function(err, profile) {
            if(err) throw err;
            return res.json({profile});
        });
    });
});

router.post('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    const errors = profileValidation(req.body);
    if(!_.isEmpty(errors)) return res.status(400).json({ errors });


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

router.delete('/experience/:experience_id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    Profile.findById(req.user._id, function(err, profile) {
        if(err) throw err;
        const exp = profile.experience.find(exp => exp._id == req.params.experience_id);
        const indexOfExp = profile.experience.indexOf(exp)
        profile.experience.splice(indexOfExp, 1);
        profile.save(function(err, profile) {
            if(err) throw err;
            return res.json(profile);
        });
    });
});

router.delete('/education/:education_id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    Profile.findById(req.user._id, function (err, profile) {
        if (err) throw err;
        const edu = profile.education.find(edu => edu._id == req.params.education_id);
        const indexOfEdu = profile.education.indexOf(edu)
        profile.education.splice(indexOfEdu, 1);
        profile.save(function (err, profile) {
            if (err) throw err;
            return res.json(profile);
        });
    });
});

router.delete('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    User.findByIdAndRemove(req.user._id, function(err, user) {
        if(err) throw err;
        return res.json({success: true});
    });
});

module.exports = router;