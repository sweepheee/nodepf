import routes from "../routes"
import User from "../models/User";
import Board from "../models/Board";
import moment from "moment";

export const board = async (req, res) => {
    try {
        const pagggg = req.query.paging
        const page_process = (pagggg-1) * 10;
        const posts = await Board.find({}).populate('creator').sort({"createdAt":1}).skip(page_process).limit(10);
        let page = 1;
        await Board.count({}, (err, count) => {
            if(count>10) {
                page = (count / 10) + 1;
                page = Math.floor(page);
            }
        });
        res.redirect(`/board/paging/${page}`);
        //res.render("board", {pageTitle: "board", posts, moment, page : Math.floor(page)});
    }catch(error) {
        console.log(error);
        res.render("board", {pageTitle: "board", boards: [] });
    }
}

export const boardPageNumber = async (req, res) => {
    try {
        const {
            params : { i }
        } = req;
        const page_process = (i-1) * 10;
        console.log("페이지프로세스"+page_process);
        const posts = await Board.find({}).populate('creator').sort({"createdAt":1}).skip(page_process).limit(10);
        let page = 1;
        await Board.count({}, (err, count) => {
            console.log("카운터"+count);
            if(count>10) {
                page = (count / 10) + 1;
                page = Math.floor(page);
            }
        });
        res.render("board", {pageTitle: "board", posts, moment, page});
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
        console.log(content);
        const contentReplace = content.replace(/\r\n/gi, '<br>');
        console.log(contentReplace);
        let no = 0;
        await Board.count({}, (err, count) => {
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
            content: contentReplace,
            imageFile: path,
            creator: req.user.id
        });
        console.log(newPosts.id);
        req.user.boards.push(newPosts.id);
        req.user.save();
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
        const post = await Board.findById(id).populate('creator');
        console.log(post+"post!!!!!");
        res.render("boardView", {pageTitle: post.title, post, moment})
    }catch(error) {
        console.log("error detected");
        res.redirect(routes.boardView);
    }
}


export const postRegisterview = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const board = await Board.findById(id);
        board.views += 1;
        board.save();
        res.status(200);
    }catch(error) {
        console.log(error);
        res.status(400);
        res.end();
    }finally {
        res.end();
    }
}