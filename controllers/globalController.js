import passport from "passport";
import routes from "../routes"
import User from "../models/User";
import Board from "../models/Board";
import moment from "moment";

export const home = async (req, res) => {
    try {
        const posts = await Board.find({}).sort({no:-1}).limit(5).populate('creator');
        const popul = await Board.find({}).sort({views:-1}).limit(5).populate('creator');
        res.render("home", {pageTitle: "home", User, posts, moment, popul});
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
         req.flash('error', '비밀번호가 일치하지 않습니다!');
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
    successRedirect: routes.home,
    successFlash: "로그인되었습니다. 환영합니다!",
    failureFlash: "로그인 실패. 아이디, 비밀번호를 확인해주세요."
});


export const githubLogin = passport.authenticate('github', {
    successFlash : "로그인 되었습니다. 환영합니다.",
    failureFlash : "로그인에 실패했습니다."
});

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile, cb);
    const { _json: { id, avatar_url, name, email } } = profile;
    try {
        const user = await User.findOne({email});
        if(user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        } else {
            const newUser = await User.create({
                email,
                name,
                githubId:id,
                avatarUrl:avatar_url
            });
            return cb(null, newUser); //error, 유저값
        }
    }catch(error) {
        return cb(error);
    }
}


export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    req.flash('info', "로그아웃되었습니다.");
    req.logout();
    res.redirect(routes.home);
}