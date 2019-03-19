import routes from "../routes"
import User from "../models/User";
import Board from "../models/Board";
import Comment from "../models/Comment";
import moment from "moment";

export const board = async (req, res) => {
    try {
        let page = 1;
        await Board.count({}, (err, count) => {
            if(count>10) {
                page = (count / 10) + 1;
                page = Math.floor(page);
            }
        });
        res.redirect(`/board/paging/${page}`);
    }catch(error) {
        console.log(error);
        res.render("board", {pageTitle: "board", boards: [] });
    }
}

export const postBoard = async (req, res) => {
    const {
        body : { seachingBy }
    } = req;
    try {
        const posts = await Board.find({delete: 0}).regex('title', seachingBy).populate('creator').sort({"createdAt":1}).limit(10);
        res.render("board", {pageTitle: "board", posts, moment});
    }catch(error) {
        console.log(error);

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
export const postWrite = async (req, res) => {
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
        const post = await Board.findById(id).populate('creator').populate('comments');
        const CMT = await Comment.find({ boards : id }).populate('creator');
        res.render("boardView", {pageTitle: post.title, post, moment, CMT, moment})
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

export const getEditBoard = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const post = await Board.findById(id).populate('creator');
        if(post.creator.id == req.user.id) {
            res.render("boardEdit", {pageTitle: "board Edit", post, moment});
        }else {
            console.log("실패");
            res.redirect(routes.boardView(id));
        }

    }catch(error) {
        console.log(error);
        res.status(400);
    }
}

export const postEditBoard = async (req, res) => {

    try {
        const {
            params: { id },
            body: { title, content },
            file
        } = req;
        console.log(title+"타이틀, 콘텐트 :"+ content);
        const file_ = await Board.findById(id);
        await Board.findByIdAndUpdate(id, {
            title,
            content,
            imageFile : file ? file.path : file_.imageFile
        });
        res.redirect(routes.boardView(id));
    }catch(error) {
        console.log(error);
        res.redirect(routes.board);
    }
}



export const deleteBoard = async (req, res) => {
    console.log("del in")
    const { 
        params: {id}
    } = req;
    try {
        const post = await Board.findById(id).populate('creator');
        if(post.creator.id==req.user.id) {
            post.delete=1;
            post.save();
            res.redirect(routes.board);
            res.status(200);
        }else {
            res.status(400);
            res.end();
        }
    }catch(error) {
        console.log(error);
        res.statud(400);
        res.end();
    }
}


// Add Comment

export const postAddComment = async (req, res) => {
    const {
        params: {id},
        body: {comment},
        user
    } = req;

    try {
        const board = await Board.findById(id);
        const userPush = await User.findById(user.id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id,
            boards: id
        });
        board.comments.push(newComment.id);
        userPush.comments.push(newComment.id);
        board.save();
        userPush.save();
    }catch(error) {
        console.log(error);
        res.status(400);
    }finally{
        res.end();
    }
}



export const postCommentDelete = async (req, res) => {
    const {
        params: {id}
    } = req;
    try {
        console.log(id);
        const commentID = await Comment.findById(id).populate("creator");
        console.log("커멘트아이디33"+commentID);
        if(commentID.creator.id === req.user.id) {
            commentID.delete = 1;
        }
        commentID.save();
        res.redirect(routes.boardView(commentID.boards))
        res.status(200);
        
    } catch(error) {
        console.log(error);
        res.status(400);
    }finally {
        res.redirect(routes.boardView(commentID.boards));
        res.end();
    }
}