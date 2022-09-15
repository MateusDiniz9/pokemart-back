import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(15).required().trim(),
});

export default signUpSchema;
