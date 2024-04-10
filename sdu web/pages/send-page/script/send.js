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

const emailParagraph = document.getElementById("email");
emailParagraph.textContent = localStorage.getItem("email");

document.getElementById("resend").addEventListener("click", function() {
    var email = localStorage.getItem("email");
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
        if(response.ok){
            return response.json();
        }
        else throw new Error('Reset failed: Server responded with an error.');
    })
    .then(data => {
        if(data && data.passwordGenerated) {
            localStorage.clear();
            localStorage.setItem("email", email);
        } else {
            throw new Error('Reset failed: Token is missing in the response.');
        }
    })
    .catch((error) => {
        alert(error.message);
    });
});


document.getElementById("checkBtn").addEventListener("click", function() {
    const inputs = document.querySelectorAll('.numbers input');
    const values = Array.from(inputs).map(input => input.value);
    const code = values.join('');
    const email = localStorage.getItem("email");
    
    fetch('http://localhost:9090/auth/reset/code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            email: email,
            code:code
        })
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else throw new Error('Reset failed: Server responded with an error.');
    })
    .then(data => {
        if(data && data.correctCode) {
            localStorage.clear();
            localStorage.setItem("email",email);
            localStorage.setItem("code",code)
            window.location.href = "../reset-page/reset.html";
        } else {
            throw new Error('Reset failed: Token is missing in the response.');
        }
    })
    .catch((error) => {
        alert(error.message);
    });
});