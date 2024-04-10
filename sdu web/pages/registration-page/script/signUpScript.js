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

document.getElementById("SignupBtn").addEventListener("click", function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;
    var userId = document.getElementById('id').value;
    fetch('http://localhost:9090/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            userId: userId,
            email: email,
            name: username, 
            password: password 
        })
    })
    .then(response => {
        if(response.ok) return response.json();
        else throw new Error('Registration failed: Server responded with an error.');
    })
    .then(data => {
        console.log(data);
        if(data && data.token) {
            window.location.href = "../login-page/login.html";
            document.cookie = `token=${data.token}; path=/; max-age=3600`;
        } else {
            throw new Error('Registration failed: Token is missing in the response.');
        }
    })
    .catch((error) => {
        alert('Registration failed: ' + error.message);
    });
});
