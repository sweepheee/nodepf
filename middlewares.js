import routes from "./routes";
import multer from "multer";

const uploadWrite = multer({ dest:"uploads/image/" });

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'TEST';
    res.locals.routes = routes;
    res.locals.user = req.user || null;
    console.log(req.user);
    next();
};

export const onlyPublic = (req, res, next) => {
    if(req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if(req.user) {
        next();
    }else{ 
        res.redirect(routes.home);
    }
}

export const uploadWriteSingle = uploadWrite.single("imageFile")