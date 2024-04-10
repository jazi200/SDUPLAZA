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
  toGetSum();
}else{
  deleteCookie('token');
  window.location.href = "../login-page/login.html";
}

var sizeButtons = document.querySelectorAll('.size');
var modals = document.querySelectorAll('.modal');

sizeButtons.forEach(function(sizeButton, index) {
    var modal = modals[index];
    
    sizeButton.addEventListener('click', function() {
        modal.style.display = "block";
    });

    var closeButton = modal.querySelector('.close');

    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});

var sizes = document.querySelectorAll('.size-btn');
var sizeDisplay = document.getElementById('size-wear');

sizes.forEach(function(sizeBtn) {
  sizeBtn.addEventListener('click', function() {
    sizeDisplay.value = sizeBtn.innerHTML;
  });
});


function setColor(color) {
    document.getElementById('selectedColorText').textContent = "Selected color: " + color;
}


function goToBasket() {
    window.location.href = "../basket-page/basket.html";
  }


const filterButtons = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.pro');

filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
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



function showMoreDetail(id) {
    var sectionElements = document.querySelectorAll('.products');
    sectionElements.forEach(function(element) {
    element.style.display = 'none';
    });
    
    var detailDiv = document.getElementById("moredetail" + id);
    if (detailDiv.style.display === "none") {
      detailDiv.style.display = "flex";
    } else {
      detailDiv.style.display = "none";
    }
  }


  function goBack() {
    var moreDetailDivs = document.querySelectorAll('.moredetail');
    moreDetailDivs.forEach(function(div) {
      div.style.display = 'none';
    });
  
    var sectionElements = document.querySelectorAll('.products');
    sectionElements.forEach(function(element) {
      element.style.display = 'block';
    });
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
  description +=  '' + sizeDisplay.value;

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