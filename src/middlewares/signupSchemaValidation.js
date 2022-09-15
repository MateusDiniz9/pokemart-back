import signUpSchema from "../schemas/signupSchema.js";

const signUpSchemaValidation = async (req, res, next) => {
  const signup = req.body;
  const validation = signUpSchema.validate(signup);

  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }

  next();
};

export default signUpSchemaValidation;
