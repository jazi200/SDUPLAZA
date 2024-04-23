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


  let basketData = JSON.parse(localStorage.getItem('basket'));

  let basket = new Basket();
  if (basketData) {
      basketData.items.forEach(itemData => {
          let product = new Product(itemData.id, itemData.name, itemData.description, itemData.price, itemData.type, itemData.menu, itemData.image);
          basket.addProduct(product, itemData.quantity);
      });
  }

  let sum = document.querySelectorAll('#sum');
  sum.forEach(el => {
    el.textContent = basket.calculateTotal() + ' т';
  });

  displayBasketItems(basket);
  displayCard();
  
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

  if(item.image.indexOf('.png') === -1){
    productDiv.innerHTML = `
    <div class="line">
      <img src="../../img/${item.type}/${item.menu}/${item.image}.png" alt="${item.name}">
      <div class="txt">
        <p class="name">${item.name}</p>
        <p class="price">${item.price} т</p>
      </div>
      <div class="counter">
        <button class="decrement" onclick="decrement('${item.id}')">-</button>
        <div class="value">${item.quantity}</div>
        <button class="increment" onclick="increment('${item.id}')">+</button>
      </div>
    </div>
    <img src="../../img/line.png" alt="" class="separator">
  `;
  }else{
    productDiv.innerHTML = `
    <div class="line">
      <img src="../../img/${item.type}/${item.menu}/${item.image}" alt="${item.name}">
      <div class="txt">
        <p class="name">${item.name}</p>
        <p class="price">${item.price} т</p>
      </div>
      <div class="counter">
        <button class="decrement" onclick="decrement('${item.id}')">-</button>
        <div class="value">${item.quantity}</div>
        <button class="increment" onclick="increment('${item.id}')">+</button>
      </div>
    </div>
    <img src="../../img/line.png" alt="" class="separator">
  `;
  }

  contentSection.appendChild(productDiv);
  });
}

function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function displayCard(){
  fetch('http://localhost:9090/card/get-card', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      console.log("ERROR")
    }
  })
  .then(data => {
    let card = document.getElementById("card-info");
    card.innerHTML = data.type + "**" + data.number.substring(12,16);
  })  
  .catch(error =>{
    let card = document.getElementById("card-info");
    card.innerHTML = "Link a card";
  });
}

function opeenModal() {
  fetch('http://localhost:9090/card/get-card', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("CARD IS EMPTY");
      }
    })
    .then(data => {
      var modal = document.getElementById("myModal1");
      modal.style.display = "block";

      let basketData = JSON.parse(localStorage.getItem('basket'));

      let basket = new Basket();
      if (basketData) {
          basketData.items.forEach(itemData => {
              if(itemData.description == null) itemData.description = "empty";
              console.log(itemData);
              let product = new Pr(itemData.id, itemData.name, itemData.description, itemData.price, itemData.type, itemData.menu, itemData.image, itemData.quantity);
              basket.addProduct(product, itemData.quantity);
          });
      }
      console.log(basket);
      fetch('http://localhost:9090/admin/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
      },
        body: JSON.stringify({
          products: basket.items, // Ensure this matches the structure expected by PaymentProducts
      })
      })
      .then(response => {
          if(response.ok) return response.json();
          else throw new Error('Error: Server responded with an error.');
      })
      .then(data => {
          console.log(data);
      })
      .catch((error) => {
          console.error(error.message);
      });

      localStorage.clear();
    })  
    .catch(error =>{
      console.error('Ошибка:', error)
  });
}

function backToHome() {
  window.location.href = "../home-page/homepage.html";
}

function closeeModal() {
  var modal = document.getElementById("myModal1");
  modal.style.display = "none";
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
  let sum = document.querySelectorAll('#sum');
  sum.forEach(el => {
    el.textContent = basket.calculateTotal() + ' т';
  });
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
  let sum = document.querySelectorAll('#sum');
  sum.forEach(el => {
    el.textContent = basket.calculateTotal() + ' т';
  });
}

function addCard(){
  const cardNumber = document.getElementById('card-number').value;
  const cardDate = document.getElementById('card-date').value;
  const cardCVV = document.getElementById('card-cvv').value;
  const month = cardDate.substring(5);
  const year = cardDate.substring(2,4);
  if(document.getElementById("card-info").innerHTML != "Link a card"){
    fetch('http://localhost:9090/card/update-card', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
          "number":cardNumber,
          "expirationMonth":month,
          "expirationYear":year,
          "cvv":cardCVV
      })
    })
    .then(response => {
        if(response.ok) return response.json();
        else throw new Error('Login failed: Server responded with an error.');
    })
    .then(data => {
        if(data && data.token) {
            document.cookie = `token=${data.token}; path=/; max-age=3600`;
            displayCard();
            closeModal()
        } else {
            throw new Error('Login failed: Token is missing in the response.');
        }
    })
    .catch((error) => {
        alert(error.message);
        closeModal()
        displayCard();
    });
  }else{
    fetch('http://localhost:9090/card/register', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
          "number":cardNumber,
          "expirationMonth":month,
          "expirationYear":year,
          "cvv":cardCVV
      })
    })
    .then(response => {
        if(response.ok) return response.json();
        else throw new Error('Login failed: Server responded with an error.');
    })
    .then(data => {
        if(data && data.token) {
            document.cookie = `token=${data.token}; path=/; max-age=3600`;
            displayCard();
            closeModal()
        } else {
            throw new Error('Login failed: Token is missing in the response.');
        }
    })
    .catch((error) => {
        alert(error.message);
        closeModal()
        displayCard();
    });}
}