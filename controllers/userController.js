import passport from "passport";
import routes from "../routes";
import User from "../models/User";


export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user: req.user });
}

export const userDetail = async (req, res) => {
    const { params: {id}} = req;
    try {
        const user = await User.findById(id);
        res.render("userDetail", { pageTitle: "User Detail", user});
    }catch(error) {
        res.redirect(routes.home);
    }
}

export const editProfile = (req, res) => {

}