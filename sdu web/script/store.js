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

function getSelectedSize() {
    var sizeButtons = document.querySelectorAll('input[name="size"]:checked');
    if (sizeButtons.length > 0) {
        return sizeButtons[0].value;
    } else {
        return 'Не выбран';
    }
}


function addToBasketMain(index,id, name, description, price, type, menu, image){
    closeMoreDetails(index);
    closeColor(index);
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
                
                if(item.menu === 'TOP'){
                    productDiv.innerHTML = `
                        <img src="../../img/${item.type}/${item.menu}/${item.image}.png" alt="" onclick='allDetails(${JSON.stringify(item).replace(/"/g, "&quot;")})'>
                        <button class="size" onclick="showMoreDetail('${index}')">
                            <img src="../../img/size.png" alt="">
                        </button>
                        <p>${item.description}</p>
                        <p class="price">${item.price} т</p>
                        <div id="${index}" class="modal" style="display: none;">
                            <div class="modal-content">
                                <div class="block">
                                    <p>Size</p>
                                    <span class="close" onclick="closeMoreDetails('${index}')">&times;</span>
                                </div>
                                <div class="block1">
                                    <label><input type="radio" name="size" class="size-btn" value="S"> S</label>
                                    <label><input type="radio" name="size" class="size-btn" value="M"> M</label>
                                    <label><input type="radio" name="size" class="size-btn" value="L"> L</label>
                                </div>
                                <button id="addButton" class="Add" onclick="addToBasketMain(${index}, ${item.id}, '${item.name}', getSelectedSize(), ${item.price}, '${item.type}', '${item.menu}', '${item.image}')">+ Add</button>
                            </div>
                        </div>
                    `;
                }else if(item.menu === 'BOX'){
                    productDiv.innerHTML = `
                        <img src="../../img/${item.type}/${item.menu}/${item.image}.png" alt="" onclick='allDetails(${JSON.stringify(item).replace(/"/g, "&quot;")})'>
                        <button class="size" onclick="showMoreDetail('${index}')">
                            <img src="../../img/size.png" alt="">
                        </button>
                        <p>${item.description}</p>
                        <p class="price">${item.price} т</p>
                        <div id="${index}" class="modal" style="display: none;">
                            <div class="modal-content">
                                <div class="block">
                                    <p>Colors</p>
                                    <span class="close" onclick="closeMoreDetails('${index}')">&times;</span>
                                </div>
                                <div class="colors mini">
                                    <button id="white" class="color-btn white" onclick="selectColor(event, 'white')"></button>
                                    <button id="black" class="color-btn black" onclick="selectColor(event, 'black')"></button>
                                    <button id="gray" class="color-btn brown" onclick="selectColor(event, 'brown')"></button>
                                </div>
                                <button id="addButton" class="Add" onclick="addToBasketMain(${index}, ${item.id}, '${item.name}', getSelectedColor(), ${item.price}, '${item.type}', '${item.menu}', '${item.image}')">+ Add</button>
                            </div>
                        </div>
                    `;
                }else if(item.menu === 'BOTTLE'){
                    productDiv.innerHTML = `
                    <img src="../../img/${item.type}/${item.menu}/${item.image}.png" alt="">
                    <p class="price">${item.price} т</p>
                    <p>${item.name}</p>
                    <button class="add" onclick="addToBasketMain(${item.id}, '${item.name}', '${item.description}', ${item.price}, '${item.type}', '${item.menu}', '${item.image}')">
                        + Add
                    </button>
                    `;
                }else if(item.menu === 'ACCESSORY'){
                    productDiv.innerHTML = `
                    <img src="../../img/${item.type}/${item.menu}/${item.image}.png" alt="">
                    <button class="size" onclick="showColor('${index}')"><img src="../../img/size.png" alt=""></button>
                    <p class="b">SDU</p>
                    <p>Shopper bag | standard</p>
                    <p class="price">19 900 т</p>
                    <div id="m${index}" class="modal" style="display: none;">
                        <div class="modal-content">
                            <div class="block">
                                <p>Colors</p>
                                <span class="close">&times;</span>
                            </div>
                            <div class="colors mini">
                                <button id="white" class="color-btn white" onclick="selectColor(event, 'white')"></button>
                                <button id="black" class="color-btn black" onclick="selectColor(event, 'black')"></button>
                                <button id="gray" class="color-btn brown" onclick="selectColor(event, 'brown')"></button>
                            </div>
                            <button id="addButton" class="Add" style="margin-top: 30px;" 
                            onclick="addToBasketMain(${index},${item.id}, '${item.name}', getSelectedColor(), ${item.price}, '${item.type}', '${item.menu}', '${item.image}')"
                            >
                            + Add
                            </button>
                        </div>
                    </div>
                    `
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

function selectColor(event, color) {
    // Remove 'selected' class from all buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    event.currentTarget.classList.add('selected');
}

function getSelectedColor() {
    // Find the button that has the 'selected' class
    const selectedButton = document.querySelector('.color-btn.selected');
    return selectedButton ? selectedButton.id : null; // Return the id of the selected button or null if none is selected
}

function getColor() {
    var colorButtons = document.querySelectorAll('input[name="color"]:checked');
    return colorButtons.length > 0 ? colorButtons[0].value : 'Не выбран';
}

function allDetails(item) {
    document.querySelectorAll(".product").forEach(item =>{
        item.style.display = "none";
    })

    document.querySelector('#moredetail img').src = "../../../img/" + item.type + "/" + item.menu + "/" + item.image + ".png";
    console.log(document.querySelector('#moredetail img').src);
    document.querySelector('#moredetail img').alt = item.name;

    document.getElementById('descName').textContent = item.name;
    document.querySelector('.descPrice').textContent = item.price + " т";

    document.getElementById('moredetail').style.display = 'flex';
}

function setColor(color) {
    document.getElementById('selectedColorText').textContent = "Selected color: " + color;
}

function showMoreDetail(index) {
    var modal = document.getElementById(index);
    if (modal.style.display === "none") {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
}
function showColor(index) {
    var modal = document.getElementById("m"+index);
    if (modal.style.display === "none") {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
}

function closeColor(itemId) {
    var modalId = itemId;  // Assuming the modal ID is the same as the item ID
    var modal = document.getElementById("m"+modalId);
    if (modal) {
        modal.style.display = "none";
    }
}
function closeMoreDetails(itemId) {
    var modalId = itemId;  // Assuming the modal ID is the same as the item ID
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
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
