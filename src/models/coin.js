const mongoose = require('../database');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
        uppercase: true
    },
    crypto: {
        type: Boolean,
    },
    value: {
        type: Number,
    },
    real:{
        type: Boolean
    },
    symbol:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Coin = mongoose.model('Coin', userSchema)

module.exports = Coin