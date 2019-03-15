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
    
    try {
        console.log("in Post EditProfile    ")
        const {
            body: {name, oldPassword, newPassword, newPassword2},
            file
        } = req;
        await User.findByIdAndUpdate(req.user.id, {
            name,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        if(oldPassword !== '' && newPassword !== '' && newPassword2 !== '') {
            console.log("널값아닐경우진입");
            if(newPassword !== newPassword2){
                res.status(400);
                res.redirect(routes.me);
                console.log("패스워드같지않음");
                return;
            } 
            console.log("패스워드 다같음.");
            await req.user.changePassword(oldPassword, newPassword);
        }
        res.redirect(routes.me);
    }catch(error) {
        res.redirect(routes.editProfile);
        console.log("error"+error);
    }
}
