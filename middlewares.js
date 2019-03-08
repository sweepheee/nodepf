import routes from "./routes";
import multer from "multer";

const uploadWrite = multer({ dest:"uploads/" });

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'TEST';
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated : true,
        id : 1
    }
    next();
};


export const uploadWriteSingle = uploadWrite.single("insertInputName")