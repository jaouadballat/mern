const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    avatar: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next(); //password has not modified
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparPassword = function (candidatePassword, cb) {

    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

UserSchema.methods.gravatar = function(email) {
    this.avatar = gravatar.url(email, { s: '200'});
}

module.exports = mongoose.model('User', UserSchema);