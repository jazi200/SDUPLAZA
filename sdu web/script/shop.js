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

let shop = document.querySelector('#shop').innerHTML;

function getProducts(){
    fetch('http://localhost:9090/products/get?type='+ encodeURIComponent(shop), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    .then(response => {
        if(response.ok) return response.json();
        else throw new Error('Login failed: Server responded with an error.');
    })
    .then(data => {
        if(data) {
            toGetSum();
            const contentSection = document.querySelector('.pro');
            contentSection.innerHTML = '';

            data.products.forEach((item, index) => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.classList.add(`${item.menu}`)
                
                if(item.image.indexOf('.png') === -1){
                    productDiv.innerHTML = `
                    <img src="../../img/${item.type}/${item.menu}/${item.image}.png" alt="">
                    <p class="price">${item.price} т</p>
                    <p>${item.name}</p>
                    <button class="add" onclick="addToBasketMain(${item.id}, '${item.name}', '${item.description}', ${item.price}, '${item.type}', '${item.menu}', '${item.image}')">
                        + Add
                    </button>
                    `;
                }else{
                    productDiv.innerHTML = `
                    <img src="../../img/${item.type}/${item.menu}/${item.image}" alt="">
                    <p class="price">${item.price} т</p>
                    <p>${item.name}</p>
                    <button class="add" onclick="addToBasketMain(${item.id}, '${item.name}', '${item.description}', ${item.price}, '${item.type}', '${item.menu}', '${item.image}')">
                        + Add
                    </button>
                `;
                }
                contentSection.appendChild(productDiv);
            });
        } else {
            throw new Error('ERROR');
        }
    })
    .catch((error) => {
        alert(error.message);
    });
}

getProducts();


const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const category = button.getAttribute('data-category').toUpperCase();
        let products = document.querySelectorAll('.product');
        products.forEach(product => {
            if (category === 'all' || product.classList.contains(category)) {
                product.style.display = "block";
            }else{
                product.style.display = "none";
            }
            
        })
    });
});
