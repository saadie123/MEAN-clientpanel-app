const express = require('express');
const brcrypt = require('bcryptjs');

const User = require('../models/User');
const router = express.Router();

router.post('/register', (req, res) => {
    brcrypt.genSalt(10, (err, salt) => {
        brcrypt.hash(req.body.password, salt, async (err, hash) => {
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

module.exports = router;