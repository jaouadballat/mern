var express = require('express');
var router = express.Router();
const _ = require('lodash');
const passport = require('passport');

const Post = require('../models/Post');
const Profile = require('../models/Profile');
const postValidation = require('../validation/postValidation');

router.post('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    const errors = postValidation(req.body);
    if(!_.isEmpty(errors)) return res.json(errors);

    const post = new Post({
        name: req.body.name,
        avatar: req.body.avatar,
        text: req.body.text,
        user: req.user._id
    });

    post.save(function(err, post) {
        if(err) throw err;
        return res.json(post);
    });
});

router.get('/', function(req, res) {
    Post.find().sort({'date': 'desc'})
    .exec(function (err, posts) {
        if (err) throw err;
            return res.json(posts);
        });
});

router.get('/:post_id', passport.authenticate('jwt', { session: false }), function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if(err) throw err;
        if(!post) return res.json({msg: 'post not found'});
        return res.json(post);
    });
});

router.delete('/:post_id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
        Post.findById(req.params.post_id, function(err, post) {
            if(err) throw err;
            if(!post) return res.json("post not found");
            if(req.user._id.toString() !== post.user.toString()) return res.json('Unauthorized');
            return post.remove(function(err) {
                if(err) throw err;
                return res.json({success: true});
            });
        });
});

module.exports = router;
