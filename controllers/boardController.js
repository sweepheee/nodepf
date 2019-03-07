import routes from "../routes"
import User from "../models/User";

export const getWrite = (res, req) => {
    res.render("write", {pageTitle: "write"});
}