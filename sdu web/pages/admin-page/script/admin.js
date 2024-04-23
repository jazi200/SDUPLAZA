const filterButtons = document.querySelectorAll('.filter-btn');
const orders = document.querySelectorAll('.data');
const data = document.querySelector('#date');
data.innerHTML = getCurrentDate();

filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const category = button.getAttribute('data-category');
        orders.forEach(order => {
            const orderCategory = order.getAttribute('data-category');
            if (category === 'all' || orderCategory === category) {
                order.style.display = 'block';
            } else {
                order.style.display = 'none';
            }
        });
    });
});

function getCurrentDate() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    return formattedDate;
}

document.addEventListener("DOMContentLoaded", function() {
    var defaultShopName = 'Red Coffee';
    var defaultType = "RED_COFFEE";
    var defaultAnchor = document.querySelector("a[href='#'][onclick=\"changeShopName(this, '" + defaultShopName + "', '"+defaultType + "')\"]");
    changeShopName(defaultAnchor, defaultShopName, defaultType);
});

function changeShopName(clickedElement, name, defaultType) {
    document.getElementById('shop').innerHTML = name;
    var previousSelected = document.querySelector('a[selected]');
    if (previousSelected) {
        previousSelected.removeAttribute('selected');
        previousSelected.style.color = ''; // Reset color
    }
    clickedElement.style.color = '#212153';
    getElements(defaultType);
}

function getAll(){
    const all = document.querySelectorAll('.order');

    all.forEach(order =>{
        order.style.display = 'block';
    });
}
function getReady(){
    const all = document.querySelectorAll('.order');

    all.forEach(order =>{
        const statusElement = order.querySelector('p#status');
        if (statusElement.textContent === 'Ready') {
            order.style.display = 'block';
        }else{
            order.style.display = 'none';
        }
    });
}

function getElements(type){
    const ordersContainer = document.querySelector('.orders'); // The container for all orders
    ordersContainer.innerHTML = '';
    fetch('http://localhost:9090/admin/get', {
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
        let index = 0;
        data.forEach(order => {
            let contains = false;
            order.products.forEach(product => {
                if(product.type === type){
                    contains = true;
                }
            });
            if(contains){
                let id = index;
                const orderDiv = document.createElement('div');
                orderDiv.classList.add('order');

                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('details');
                const userId = document.createElement('p');
                userId.textContent = order.userId;
                const orderIdP = document.createElement('p');
                orderIdP.textContent = order.orderId;
                const statusP = document.createElement('p');
                statusP.id = 'status';
                if(order.status === 1){
                    statusP.textContent = "Not ready";
                }else if(order.status === 2){
                    statusP.textContent = "Ready";
                    this.disabled = true;
                    const image = document.createElement('img');
                    image.src = './checkbox2.png';
                    statusP.appendChild(image); 
                }
                detailsDiv.appendChild(userId);
                detailsDiv.appendChild(orderIdP);
                detailsDiv.appendChild(statusP);
                orderDiv.appendChild(detailsDiv);
                order.products.forEach(product => {
                    if(product.type === type){
                        const productDiv = document.createElement('div');
                        productDiv.classList.add('product');
                        const productNameP = document.createElement('p');
                        productNameP.textContent = `${product.name} ${product.price}`;
                        const productButton = document.createElement('button');
                        productButton.textContent = `${product.amount}`; 

                        productDiv.appendChild(productNameP);
                        productDiv.appendChild(productButton);

                        orderDiv.appendChild(productDiv);
                    }
                });

                const readyButton = document.createElement('button');
                readyButton.id = 'ready';
                readyButton.classList.add('ready');
                readyButton.textContent = 'ORDER READY';

                readyButton.addEventListener('click', function() {
                    statusP.textContent = 'Ready';
                    this.disabled = true;
                    changeStatus(id);
                    const image = document.createElement('img');
                    image.src = './checkbox2.png';
                    statusP.appendChild(image); 
                });

                orderDiv.appendChild(readyButton);

                ordersContainer.appendChild(orderDiv);
                
            }

            index++;
        });
    })
    .catch((error) => {
        alert(error.message);
    });
}
getElements();

function changeStatus(index){
    fetch(`http://localhost:9090/admin/change?id=${encodeURIComponent(index)}&status=${encodeURIComponent(2)}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        if(data.true){
            window.location.href = ".admin.html";
        }
    })
    .catch(error => {
        // window.location.href = "../login-page/login.html";
    });
}