const Joi = require('joi');
const JoiValidationError = lulu.use('app/errors/JoiValidationError');

const UserRegistrationRequestSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().error(() => new JoiValidationError('Name must be between 3 and 30 characters.', 'name')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).error(() => new JoiValidationError('Email must be valid.', 'email')),
    password: Joi.string().min(6).max(30).required().error(() => new JoiValidationError('Password Wrong.', 'password')),   
});

const PostCreateRequestSchema = Joi.object({
    title: Joi.string().min(3).max(150).required().error(() => new JoiValidationError('Name must be between 3 and 150 characters.', 'title')),
});

const CommentCreateRequestSchema = Joi.object({
    content: Joi.string().min(3).max(4000).required().error(() => new JoiValidationError('Comment must be between 3 and 4000 characters.', 'content')),
});


module.exports = {
    UserRegistrationRequestSchema,
    PostCreateRequestSchema,
    CommentCreateRequestSchema
};

/* It's better use your own validation error with custom error message. Handler works fine. */