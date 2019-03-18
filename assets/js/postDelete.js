import axios from "axios";

const jsPostDelete = document.getElementById("jsPostDelete");

const handleDelete = async (event) => {
    console.log("clicked");
    const boardId = window.location.href.split("/board/")[1];
    const response = await axios({
        url : `/board/${boardId}/delete`,
        method: "POST",
        data: {
            id: boardId
        }
    });
    console.log(response);
    if(response.status === 200) {
        console.log("성공");
        window.location.href="/board";
    }
}



if(jsPostDelete) {
    const aa = document.getElementById("jsPostDelete").addEventListener("click", handleDelete);
}