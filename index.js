const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://saadie:saadie@ds059306.mlab.com:59306/clientpanel')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})