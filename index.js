const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongodbURL);

const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'javascriptislove',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api/clients', clientRoutes);

app.use('*',(req,res)=>{
    res.redirect('/');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})