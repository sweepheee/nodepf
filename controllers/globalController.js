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
export const postJoin = (req, res) => {
    console.log(req.body); // 바디파서가 있어서 작동함.
    const { 
        body: { email, password, password2, nickname}
     } = req;
     if(password !== password2) {
         res.status(400);
         res.render("join", {pageTitle: "join"}); 
         // 이 부분 나중에 비밀번호 틀리다고 수정해야함
     }
    res.redirect(routes.home);
}


// LOGIN ROUTER
export const getLogin = (req, res) => res.render("login");
export const postLogin = (req, res) => {
    res.redirect(routes.home);
}