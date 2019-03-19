import axios from "axios";

const idCheck = document.getElementById("joinId");
const match = document.getElementById('password__unMatch');
const btn = document.getElementById('join__submit__btn');

const duplicationCheck = async (event) => {
    console.log("에젝스");
     const response = await axios({
         url : `/api/${idCheck.value}/idCheck`,
         method: "GET"
     }).then(function (res) {
        if(res.status == 200) {
            match.innerHTML = "중복되는 이메일명입니다.";
            btn.setAttribute("disabled", "disabled");
        }else {
            match.innerHTML = "";
            btn.removeAttribute("disabled");

        }
      })
      .catch(function (error) {
      });
}

if(idCheck) {
    idCheck.addEventListener("change", duplicationCheck);
}