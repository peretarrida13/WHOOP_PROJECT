const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    acessToken: String,
    expiresIn: Date,
    firstName: String,
    lastName: String,
    refreshToken: String,
    userId: String,
})

module.exports = mongoose.model('User', userSchema)