import routes from "../routes"
import User from "../models/User";
import Board from "../models/Board";
import moment from "moment";

export const board = async (req, res) => {
    try {
        const posts = await Board.find({}).sort({no:-1});
        console.log(posts);
        res.render("board", {pageTitle: "board", posts, moment});
    }catch(error) {
        console.log(error);
        res.render("board", {pageTitle: "board", boards: [] });
    }
}

// WRITE
export const getWrite = (req, res) => {res.render("write", {pageTitle: "write"});}
export const postWrite = async(req, res) => {
    try {
        const { 
            body: {title, content}, 
            file: { path }
        } = req;
        let no = 0;
        const boardNo = await Board.count({}, (err, count) => {
            console.log("users: ", count);
            if(count===0) {
                no = 1;
            }else {
                no = count + 1;
            }
        });
        console.log("no:", no);
        const newPosts = await Board.create({
            no,
            title,
            content,
            imageFile: path
        });
        console.log(newPosts.id)
        res.redirect(routes.boardView(newPosts.id));
    }catch(error) {
        console.log(error);
        res.redirect(routes.board);        
    }
}


export const getBoardView = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const post = await Board.findById(id)
        console.log(post+"post!!!!!");
        res.render("boardView", {pageTitle: post.title, post, moment})
    }catch(error) {
        console.log("error detected");
        res.redirect(routes.boardView);
    }
}