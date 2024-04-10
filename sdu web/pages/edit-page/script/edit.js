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
            console.log("OK");
        } else {
            deleteCookie('token');
            window.location.href = "../login-page/login.html";
        }
    })
    .catch(error =>{
        deleteCookie('token');
        console.error('Ошибка:', error)
    });
}else{
    window.location.href = "../login-page/login.html";
}


var updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", function() {
    var editUsername = document.getElementById("editUsername").value;
    var editEmail = document.getElementById("editEmail").value;
    var editId = document.getElementById("editId").value;

    fetch(`http://localhost:9090/update/set?username=${encodeURIComponent(editUsername)}&email=${encodeURIComponent(editEmail)}&id=${encodeURIComponent(editId)}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        if(data && data.token){
            deleteCookie('token');
            document.cookie = `token=${data.token}; path=/; max-age=3600`;
            window.location.href = "../profile-page/profile.html";
        }
    })
    .catch(error => {
        window.location.href = "../login-page/login.html";
    });
});

var exitEditBtn = document.getElementById("exitEditBtn");
exitEditBtn.addEventListener("click", function() {
    deleteCookie('token');
    window.location.href = "../login-page/login.html";
});