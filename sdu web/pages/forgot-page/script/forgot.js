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

document.getElementById("SendBtn").addEventListener("click", function() {
    var email = document.getElementById('email').value;
    
    fetch('http://localhost:9090/auth/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            email: email
        })
    })
    .then(response => {
        if(response.ok) return response.json();
        else throw new Error('Reset failed: Server responded with an error.');
    })
    .then(data => {
        if(data && data.passwordGenerated) {
            localStorage.setItem('email', email);
            window.location.href = "../send-page/send.html";
        } else {
            throw new Error('Reset failed: Token is missing in the response.');
        }
    })
    .catch((error) => {
        alert(error.message);
    });
});