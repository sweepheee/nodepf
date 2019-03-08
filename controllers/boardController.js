import routes from "../routes"
import User from "../models/User";

export const board = (req, res) => {res.render("board", {pageTitle: "board"});}

// WRITE
export const getWrite = (req, res) => {res.render("write", {pageTitle: "write"});}
export const postWrite = (req, res) => {
    console.log(req.body);
    const { body } = req;
    res.redirect(routes.board);
}
