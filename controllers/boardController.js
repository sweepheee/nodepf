import routes from "../routes"
import User from "../models/User";
import Board from "../models/Board";

export const board = async (req, res) => {
    try {
        const posts = await Board.find({});
        console.log(posts);
        res.render("board", {pageTitle: "board", posts});
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
        const newPosts = await Board.create({
            title,
            content,
            imageFile: path
        });
        console.log('간다다다다'+ newPosts.id)
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
        res.render("boardView", {pageTitle: post.title, post})
    }catch(error) {
        console.log("error detected");
        res.redirect(routes.boardView);
    }
}