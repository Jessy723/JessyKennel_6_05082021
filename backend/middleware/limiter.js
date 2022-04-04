// IMPORT
const  rateLimit  =  require ('express-rate-limit') ;

// CONFIGURATION
const max  =  rateLimit ( { 
  windowMs : 5  *  60  *  1000 ,  // délai en ms 
  max : 3, // nombre de tentatives authorisées
  message : "Votre compte est bloqué pendant 5 minutes suite à 3 tentatives infructueuses."
} ) ;

// EXPORT
module.exports = {max} ;