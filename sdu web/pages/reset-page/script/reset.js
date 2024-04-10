function getCookie(name) {
    let cookieArr = document.cookie.split(';');
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split('=');
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
}

const token = getCookie('token');
if (token) {
    fetch('http://localhost:9090/home', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '../home-page/homepage.html';
        } else {
            deleteCookie('token');
        }
    })
    .catch(error =>{
        deleteCookie('token');
        console.error('Ошибка:', error)
    });
}

document.getElementById("ResetBtn").addEventListener("click", function() {
    const email = localStorage.getItem("email");
    const code = localStorage.getItem("code");
    const pass = document.getElementById("new-password").value;
    const confPass = document.getElementById("confirm-password").value;

    fetch('http://localhost:9090/auth/reset/code/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            email: email,
            code: code,
            password: pass,
            rePassword: confPass
        })
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else throw new Error('Reset failed: Server responded with an error.');
    })
    .then(data => {
        if(data) {
            window.location.href = "../login-page/login.html";
        } else {
            throw new Error('Reset failed: Token is missing in the response.');
        }
    })
    .catch((error) => {
        alert(error.message);
    });
});