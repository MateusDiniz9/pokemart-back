import { stripHtml } from "string-strip-html";

const signUpDataSanitizer = async (req, res, next) => {
  const signup = req.body;
  const email = stripHtml(signup.email).result.trim();
  const password = stripHtml(signup.password).result.trim();
  const name = stripHtml(signup.name).result.trim();
  res.locals.signup = signup;
  next();
};

export default signUpDataSanitizer;
