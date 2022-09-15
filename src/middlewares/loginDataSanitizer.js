import { stripHtml } from "string-strip-html";

const loginDataSanitizer = async (req, res, next) => {
  const login = req.body;
  const email = stripHtml(login.email).result.trim();
  const password = stripHtml(login.password).result.trim();

  res.locals.login = login;
  next();
};

export default loginDataSanitizer;
