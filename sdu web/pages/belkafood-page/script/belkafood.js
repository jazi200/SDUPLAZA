function goToBasket() {
    window.location.href = "basket.html";
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


function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

function opeenModal() {
var modal = document.getElementById("myModal1");
modal.style.display = "block";
}

function opeeenModal() {
    var modal = document.getElementById("myModal2");
    modal.style.display = "block";
    }

  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  function clooseModal() {
    var modal = document.getElementById("myModal1");
    modal.style.display = "none";
  }

  function cloooseModal() {
    var modal = document.getElementById("myModal2");
    modal.style.display = "none";
  }