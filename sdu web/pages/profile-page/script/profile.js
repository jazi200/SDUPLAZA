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
            return response.json();
        } else {
            deleteCookie('token');
            window.location.href = "../login-page/login.html";
        }
    })
    .then(data => {
        document.getElementById('username').innerHTML = `<b>${data.name}</b>`;
        document.getElementById('email').innerHTML = `<b>${data.email}</b>`;
        document.getElementById('id').innerHTML = `<b>${data.userId}</b>`;
    })    
    .catch(error =>{
        deleteCookie('token');
        console.error('Ошибка:', error)
    });
}else{
    window.location.href = "../login-page/login.html";
}

var exitEditBtn = document.getElementById("exitBtn");
exitEditBtn.addEventListener("click", function() {
    deleteCookie('token');
    window.location.href = "../login-page/login.html";
});

var updateBtn = document.getElementById("editBtn");
updateBtn.addEventListener("click", function() {
    window.location.href = "../edit-page/edit.html";
});