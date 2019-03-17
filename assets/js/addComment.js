import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}

const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.append(li);
    increaseNumber();
}

const sendComment = async (comment) => {

     console.log(comment);
     const boardId = window.location.href.split("/board/")[1];
     const response = await axios({
         url : `/api/${boardId}/comment`,
         method: "POST",
         data: {
             comment: comment
         }
     });
     console.log(response);
     if(response.status === 200) {
         addComment(comment);
     }
}

const handleSubmit = (event) => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("textarea");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
}

function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
}

if(addCommentForm) {
    init();
}