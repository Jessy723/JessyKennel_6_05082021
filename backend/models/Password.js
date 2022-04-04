// IMPORT
const passwordValidator = require('password-validator');

// INSTANCE
const passwordSchema = new passwordValidator();

// CRITERES
passwordSchema
    .is().min(8)
    .is().max(15)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .is().not().oneOf(['1Aaaaaaa','2Bbbbbbb'])

// EXPORT
module.exports = passwordSchema;