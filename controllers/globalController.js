import passport from "passport";
import routes from "../routes"
import User from "../models/User";


export const home = async (req, res) => {
    try {
        const users = await User.find({});
        res.render("home", {pageTitle: "home", User});
    }catch(error) {
        console.log(error);
        res.render("home", {pageTitle: "home", User: [] });
    }
}

// JOIN ROUTER
export const getJoin = (req, res) => res.render("join");
export const postJoin = async (req, res, next) => {
    console.log(req.body); // 바디파서가 있어서 작동함.
    const { 
        body: { name, email, password, password2}
     } = req;
     if(password !== password2) {
         res.status(400);
         res.render("join", {pageTitle: "join"}); 
     }else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        }catch(error) {
            console.log(error);
            res.redirect(routes.home);
        }
     }
};


// LOGIN ROUTER
export const getLogin = (req, res) => res.render("login");
export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});