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
            window.location.href = '../login-page/login.html';
        }
    })
    .catch(error =>{
        deleteCookie('token');
        console.error('Ошибка:', error)
    });
}else{
    deleteCookie('token');
    window.location.href = "../login-page/login.html";
}