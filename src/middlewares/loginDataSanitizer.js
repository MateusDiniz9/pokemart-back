import { stripHtml } from 'string-strip-html';

const loginDataSanitizer = async (req, res, next) => {
    const login = req.locals;
    login = stripHtml(login).result.trim();
    //password = stripHtml(login.password).result.trim();

    res.locals.login = login;
    next();
}

export default loginDataSanitizer;