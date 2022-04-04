// IMPORTS
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');
const mongoSanitize = require ('express-mongo-sanitize');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const app = express();

// CONNEXION A LA BASE DE DONNEES
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_LINK}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// FONCTIONNALITES DU SERVEUR EXPRESS

  // Sécurisation des en-têtes htpp
  app.use(helmet());

  // Paramétrage des en-têtes
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // Pour parser les objets json
  app.use(express.json());

  // Pour éviter l'injection de code dans MongoDB
  app.use(mongoSanitize());

  // Pour la gestion des fichiers images
  app.use('/images', express.static(path.join(__dirname, 'images')));

  // Routes
  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);

// EXPORT
module.exports = app;