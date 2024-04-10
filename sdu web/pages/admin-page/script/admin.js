const filterButtons = document.querySelectorAll('.filter-btn');
        const orders = document.querySelectorAll('.data');

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