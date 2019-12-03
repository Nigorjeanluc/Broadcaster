import Joi from '@hapi/joi';

import User from '../models/userModel';

class AuthValidation {
    static signupValidator(req, res, next) {
        const Schema = Joi.object().keys({
            createdOn: Joi.date().required(),
            firstname: Joi.string().min(3).max(40).label('First Name').trim().required(),
            lastname: Joi.string().min(3).max(40).label('Last Name').trim().required(),
            email: Joi.string().email().label('Email').trim().required(),
            phoneNumber: Joi.string().min(3).max(40).label('Phone Number').trim().required(),
            username: Joi.string().min(3).max(40).label('Username').trim().required(),
            isAdmin: Joi.boolean().required(),
            password: Joi.string().label('Password').trim().required(),
        });

        const user = new User(req.body);
        const result = Schema.validate(user, {
            abortEarly: false
        });
        const valid = result.error == null;

        if (valid) {
            return next();
        }
        const { details } = result.error;
        const message = details.map(i => i.message.replace(/"/g, '')).join(', ');

        return res.status(400).json({
            status: 400,
            error: message,
        });

    }
}

export default AuthValidation;
