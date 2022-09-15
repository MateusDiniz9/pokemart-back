import loginSchema from '../schemas/loginSchema.js';

const loginSchemaValidation = async (req, res, next) => {
    const login = req.body;
    const validation = loginSchema.validate(login);

    if (validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    }
    
    next();
}

export default loginSchemaValidation;