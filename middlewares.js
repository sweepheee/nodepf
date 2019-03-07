import routes from "./routes";
import multer from "multer";

const write = multer({ dest:"write/" });

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'TEST';
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated : true,
        id : 1
    }
    next();
}