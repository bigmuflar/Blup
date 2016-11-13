'use strict'

const SALT = 10

var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    UserSchema = new mongoose.Schema({
        name     : String,
        email    : { type: String, unique: true },
        password : String,
        created  : Number // Date.now()
    });

// hash passwords before saving them
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if ( !user.isModified('password') ) {
        return next();
    }
    // generate a salt
    bcrypt.genSalt(SALT, (saltErr, salt) => {
        if (saltErr) {
            return next(saltErr);
        }
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (hashErr, hash) => {
            if (hashErr) {
                return next(hashErr);
            }
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
})

module.exports = mongoose.model('User', UserSchema)
