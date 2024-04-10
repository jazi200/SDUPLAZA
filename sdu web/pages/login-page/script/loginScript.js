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

document.getElementById("LoginBtn").addEventListener("click", function() {
    var userId = document.getElementById('id').value;
    var password = document.getElementById('password').value;
    var remember = document.getElementById('remember-me');

    fetch('http://localhost:9090/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            userId: userId,
            password: password,
            remember: remember.checked ? true : false
        })
    })
    .then(response => {
        if(response.ok) return response.json();
        else throw new Error('Login failed: Server responded with an error.');
    })
    .then(data => {
        if(data && data.token) {
            document.cookie = `token=${data.token}; path=/; max-age=3600`;
            window.location.href = '../home-page/homepage.html';
        } else {
            throw new Error('Login failed: Token is missing in the response.');
        }
    })
    .catch((error) => {
        alert(error.message);
    });
});

function pass() {
    var passwordInput = document.getElementById("password");
    var passIcon = document.getElementById("pass-icon");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passIcon.src = "../../../img/eye.png";
    } else {
        passwordInput.type = "password";
        passIcon.src = "../../../img/eye1.png";
    }
}
