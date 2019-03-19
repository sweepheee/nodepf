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
        req.flash('error', '유저를 찾지 못했습니다.');
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
        if(file) {
            await User.findByIdAndUpdate(req.user.id, {
                name,
                avatarUrl: file ? file.path : req.user.avatarUrl,
                imageChange: 1
            });
        }else {
            await User.findByIdAndUpdate(req.user.id, {
                name,
                avatarUrl: file ? file.path : req.user.avatarUrl
            });
        }
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
        req.flash('success', '유저프로필 업데이트 완료')
        res.redirect(routes.me);
    }catch(error) {
        req.flash('error','유저프로필 업데이트를 실패했습니다.');
        res.redirect(routes.editProfile);
        console.log("error"+error);
    }
}


// API

export const ajaxIdCheck = async (req, res) => {
    const {
        params: { id } 
    } = req;
    try {
        const check = await User.findOne({email : id});
        console.log(check);
        if(check) {
            res.status(200);
        }
        else res.status(204);
    }catch(error) {
        console.log(error);
        res.status(400);
    }finally {
        res.end();
    }
}