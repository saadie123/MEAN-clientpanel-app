const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const router = express.Router();

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if(user){
            done(null,user);
        }
    } catch (error) {
        return done(error);
    }
});

router.get('/success', (req, res) => {
    let user = {
        name: req.user.name,
        email: req.user.email
    };
    res.status(200).send({user, message: 'You have successfully logged in!', success: true});
});
router.get('/fail', (req, res) => {
    res.status(400).send({message:'Invalid username or password!', success: false});
});

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done)=>{
    const user = await User.findOne({email});
    if(!user){
       return done(null, false, {message: 'No user was found with this email!'});
    }
    bcrypt.compare(password, user.password, (error, matched) => {
        if(error){
            return error
        }
        if(matched){
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect password!'});            
        }
    });
}));

router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/fail'
}));

router.post('/register', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            if (err) {
                return res.status(400).send({ error:err, success: false });
            }
            try {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                });
                const newUser = await user.save();
                res.status(201).send({ user:newUser, success:true })
            } catch (error) {
                return res.status(400).send({ error, success: false });                
            }
        });
    });
});

router.get('/current-user', (req, res) => {
    if(!req.user){
        return res.status(401).send({message: 'You are not logged in!', success: false})
    }
    let user = {
        name: req.user.name,
        email: req.user.email
    };
    res.send({user, success: true});
})

module.exports = router;