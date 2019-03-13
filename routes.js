const HOME ="/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// board

const BOARD = "/board";
const WRITE = "/write";
const BOARD_VIEW = "/:id"

// Github Login

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail : (id) => {
        if(id) {
            return `/users/${id}`;
        }
        return USER_DETAIL;
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    board: BOARD,
    write: WRITE,
    boardView: (id) => {
        if(id) {
            return `/board/${id}`;
        }
        return BOARD_VIEW;
    },
    github: GITHUB,
    githubCallback : GITHUB_CALLBACK,
    me: ME
};

export default routes;