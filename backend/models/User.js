// IMPORTS
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// MODELE
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// CONTROLE D'UNICITE
userSchema.plugin(uniqueValidator);

// EXPORT
module.exports = mongoose.model('User', userSchema);