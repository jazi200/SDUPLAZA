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
  let basketData = JSON.parse(localStorage.getItem('basket'));

  let basket = new Basket();
  if (basketData) {
      basketData.items.forEach(itemData => {
          let product = new Product(itemData.id, itemData.name, itemData.description, itemData.price, itemData.type, itemData.menu, itemData.image);
          basket.addProduct(product, itemData.quantity);
      });
  }

  displayBasketItems(basket);

}else{
  deleteCookie('token');
  window.location.href = "../login-page/login.html";
}

function displayBasketItems(basket) {
  const contentSection = document.querySelector('.content');

  contentSection.innerHTML = '';

    basket.items.forEach((item, index) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    productDiv.innerHTML = `
    <div class="line">
      <img src="../../../img/${item.type}/${item.menu}/${item.image}.png" alt="${item.name}">
      <div class="txt">
        <p class="name">${item.name}</p>
        <p class="price">${item.price} т</p>
        <p class="desc">${item.description} т</p>
      </div>
      <div class="counter">
        <button class="decrement" onclick="decrement('${item.id}')">-</button>
        <div class="value">${item.quantity}</div>
        <button class="increment" onclick="increment('${item.id}')">+</button>
      </div>
    </div>
    <img src="../../img/line.png" alt="" class="separator">
    `;
    

    contentSection.appendChild(productDiv);
  });

  // Добавить кнопку покупки, если корзина не пуста
  if (basket.items.length > 0) {
    const buyButton = document.createElement('button');
    buyButton.classList.add('buy');
    buyButton.textContent = 'CORRECT, DUE TO PAYMENT';
    buyButton.onclick = redirectToPayment;
    contentSection.appendChild(buyButton);
  }
}

function redirectToPayment() {
  window.location.href = "../payment-page/payment.html";
}

function increment(productId) {
  let basketData = JSON.parse(localStorage.getItem('basket'));

  let basket = new Basket();
  if (basketData) {
      basketData.items.forEach(itemData => {
          let product = new Product(itemData.id, itemData.name, itemData.description, itemData.price, itemData.type, itemData.menu, itemData.image);
          basket.addProduct(product, itemData.quantity);
      });
  }
  basket.increment(productId);
  displayBasketItems(basket);
}

function decrement(productId) {
  let basketData = JSON.parse(localStorage.getItem('basket'));

  let basket = new Basket();
  if (basketData) {
      basketData.items.forEach(itemData => {
          let product = new Product(itemData.id, itemData.name, itemData.description, itemData.price, itemData.type, itemData.menu, itemData.image);
          basket.addProduct(product, itemData.quantity);
      });
  }

  basket.decrement(productId);
  displayBasketItems(basket);
}