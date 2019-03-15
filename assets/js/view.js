
    const registerView = () => {
        const boardID = window.location.href.split("/board/")[1]
        if(boardID) {
            fetch(`/api/${boardID}/view`, {
                method: "POST"
            });
            console.log("view update+1")
        }
    }

    registerView();
