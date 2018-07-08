var express = require('express');
var router = express.Router();
const _ = require('lodash');
const passport = require('passport');

const Post = require('../models/Post');
const Profile = require('../models/Profile');
const postValidation = require('../validation/postValidation');
const commentValidation = require('../validation/commentValidation');

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
        if(!post) return res.status(400).json({msg: 'post not found'});
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

router.post('/likes/:post_id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    Post.findById(req.params.post_id, function(err, post) {
        if(!post) return res.json({msg: 'post not found'})
        let like = post.likes.find(like => like.user.toString() === req.user._id.toString());
        
        if(like) return res.json({msg: "User already liked this post"});

        post.likes.push({user: req.user._id});
        post.save(function(err) {
            if(err) throw err;
            return res.json({success: true});
        });
    });

});

router.delete('/unlikes/:post_id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    Post.findById(req.params.post_id, function(err, post) {
        if(err) throw err;
        if(!post) return res.json({msg: 'post not found'})
        let like = post.likes.find(like => like.user.toString() === req.user._id.toString());
        if(!like) return res.json({msg: 'you have not liked this post'});
            indexOfLike = post.likes.indexOf(like);
            post.likes.splice(indexOfLike, 1);
            post.save(function(err) {
                if(err) throw err;
                res.json({success: true});
            });
    });
});

router.post('/comment/:post_id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    const errors = commentValidation(req.body);
    if(!_.isEmpty(errors)) return res.json(errors);

    Post.findById(req.params.post_id, function(err, post) {
        if(err) throw err;
        if(!post) return res.json({msg: 'Post not found'});
        let comment = {
                text: req.body.text,
                avatar: req.body.avatar,
                name: req.body.name,
                user: req.user._id
            }

        post.comments.unshift(comment);

        post.save(function(err, post) {
            if(err) throw err;
            return res.json({success: true});
        });
    });
});

router.delete('/:post_id/comment/:comment_id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    Post.findById(req.params.post_id, function(err, post) {
        if(err) throw err;
        if(!post) return res.json('post not found');
        let comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id);
        if(comment.user.toString() !== req.user._id.toString()) return res.json({msg: "unauthorized"});
        const indexOfComment = post.comments.indexOf(comment);
        post.comments.splice(indexOfComment, 1);
        post.save(function(err) {
            if(err) throw err;
            return res.json({success: true});
        });
    });
});

module.exports = router;
