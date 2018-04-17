const mongoose = require('mongoose');
const validator = require('validator');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(value) {
                return validator.isEmail(value)
            },
            message: "{VALUE} is not a valid Email address"
        }
    },
    phone: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('clients',clientSchema);