const filterButtons = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product');

filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); 
        const category = button.getAttribute('data-category');
        products.forEach(product => {
            const productCategory = product.getAttribute('data-category');
            if (category === 'all' || productCategory === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

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

        } else {
            deleteCookie('token');
            window.location.href = '../login-page/login.html';
        }
    })
    .catch(error =>{
        deleteCookie('token');
        console.error('Ошибка:', error)
    });
    toGetSum();
}else{
    deleteCookie('token');
    window.location.href = "../login-page/login.html";
}

function goToBasket() {
    window.location.href = "../basket-page/basket.html";
}


function toGetSum(){
    let basketData = JSON.parse(localStorage.getItem('basket'));

    let basket = new Basket();
    if (basketData) {
        basketData.items.forEach(itemData => {
            let product = new Product(itemData.id, itemData.name, itemData.description, itemData.price, itemData.type, itemData.menu, itemData.image);
            basket.addProduct(product, itemData.quantity);
        });
    }

    let sum = document.getElementById("sum");
    sum.innerHTML = basket.calculateTotal() + " ₸";
}


function addToBasketMain(id, name, description, price, type, menu, image){
    
    let product = new Product(id, name, description, price, type, menu, image);

    let basketData = JSON.parse(localStorage.getItem('basket'));

    let basket = new Basket();
    if (basketData) {
        basketData.items.forEach(itemData => {
            let product = new Product(itemData.id, itemData.name, itemData.description, itemData.price, itemData.type, itemData.menu, itemData.image);
            basket.addProduct(product, itemData.quantity);
        });
    }
    basket.addProduct(product,1);
    
    toGetSum();

}

function openModal(id, name, description, price, type, menu, image) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";


    let bId = document.getElementById("basket-id");
    bId.value = id;
    let bName = document.getElementById("basket-name");
    bName.value = name;
    let bDescription = document.getElementById("basket-description");
    bDescription.value = description;
    let bPrice = document.getElementById("basket-price");
    bPrice.value = price;
    let bType = document.getElementById("basket-type");
    bType.value = "AC_CATERING";
    let bMenu = document.getElementById("basket-menu");
    bMenu.value = menu;
    let bImage = document.getElementById("basket-image");
    bImage.value = image;
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}