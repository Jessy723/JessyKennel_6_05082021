// IMPORTS
require('dotenv').config();
const bcrypt = require('bcrypt');
const maskData = require('maskdata');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const e = require('express');

// CONFIGURATION : masquer les données
// const emailMask2options = {
//   maskWith: "*",
//   unmaskedStartCharactersBeforeAt: 5,
//   unmaskedEndCharactersAfterAt: 3,
//   maskAtTheRate: false
// };

// INSCRIPTION
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        // OPTION : masquer les données
        // email: maskData.maskEmail2(req.body.email, emailMask2options),
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// CONNEXION
exports.login = (req, res, next) => {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.RANDOM_SECRET_TOKEN,
              { expiresIn: '48h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};