const { UserRegistrationRequestSchema } = require('./JoiValidationSchemas');
const Handler = lulu.use('app/errors/Handler');
const response = lulu.use('app/responses/Response');

module.exports = async function (req, res, next) {
    try {
        await UserRegistrationRequestSchema.validateAsync(req.body, { allowUnknown: true}); // { abortEarly: true } is default and we want abortEarly to be true
        next();
    }
    catch (error) { 
        return response.error(Handler(error), res);
    }

}