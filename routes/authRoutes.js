const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
    if(!req.user){
        return res.status(401).send({message: 'You are not logged in!', success: false})
    }
    let user = {
        name: req.user.name,
        email: req.user.email
    };
    res.status(200).send({user, message: 'You have successfully logged in!', success: true});
});
router.get('/fail', (req, res) => {
    res.status(400).send({message:'Invalid username or password!', success: false});
});

passport.use(new GoogleStrategy({
    clientID: '56463711653-itdchasipnpjigppigeqonu42urvdin3.apps.googleusercontent.com',
    clientSecret: 'aUx3pqCstjWaSDCFI0Ju3DUO',
    callbackURL: '/auth/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const oldUser = await User.findOne({email:profile.emails[0].value});
        if(!oldUser){
            const user = new User({
               name: profile.displayName,
               email: profile.emails[0].value 
            });
            const newUser = await user.save();
            done(null, newUser);
        }
        done(null, oldUser);
    } catch (error) {
        console.log(error);
    }
}));
router.get('/google', passport.authenticate('google',{
    scope: ['profile', 'email']
}));
router.get('/callback', passport.authenticate('google',{
    failureRedirect: '/auth/fail',
    successRedirect: '/auth/success'
}));

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

router.post('/register', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
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
                    res.status(201).send({ user:newUser, message: 'Your account has been registered successfully!', success:true })
                } catch (error) {
                    return res.status(400).send({ error, success: false });
                }
            });
        });
    } else{
        return res.status(400).send({ message: 'An account is already registered with this email!', success: false });
    }
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
});

router.get('/logout', (req, res)=>{
    req.logout();
    res.status(200).send({message: 'You have logged out!', success: true});
});

module.exports = router;