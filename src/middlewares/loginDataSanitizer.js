import { stripHtml } from "string-strip-html";

const loginDataSanitizer = async (req, res, next) => {
  const login = req.body;
  login.email = stripHtml(login.email).result.trim();
  login.password = stripHtml(login.password).result.trim();

  res.locals.login = login;
  next();
};

export default loginDataSanitizer;
