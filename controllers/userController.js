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

export const getEditProfile = (req, res) => {
        res.render("editProfile", {pageTitle: "Edit Profile"})
}

export const postEditProfile = async (req, res) => {
    const {
        body: {name, oldPassword, newPassword, newPassword2},
        file
    } = req;
    try {
        await User.findByIdAndUpdate(req.user.id, {
            name,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        if(oldPassword !== null && newPassword !== null && newPassword2 !== null) {
            if(newPassword !== newPassword2){
                res.status(400);
                res.redirect(routes.me);
                return;
            } 
            await req.user.changePassword(oldPassword, newPassword);
        }
        res.redirect(routes.me);
    }catch(error) {
        res.redirect(routes.editProfile);
    }
}
