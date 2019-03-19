const pwd1 = document.getElementById('joinPwd1');
const pwd2 = document.getElementById('joinPwd2');
const match = document.getElementById('password__unMatch');


const handleMatch = (event) => {
    console.log('핸들매치');
    console.log(pwd1.value+", "+pwd2.value)
    if(pwd1.value!==pwd2.value) {
        match.innerHTML = "비밀번호가 일치하지 않습니다.";
    }else {
        match.innerHTML = "";
    }
}

pwd1.addEventListener("keyup", handleMatch);
pwd2.addEventListener("keyup", handleMatch);
