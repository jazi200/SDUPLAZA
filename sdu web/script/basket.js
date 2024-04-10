class Basket {
    constructor() {
        this.items = []; 
        this.updateLocalStorage();
    }
    addProduct(product, quantity) {
        const existingProductIndex = this.items.findIndex(p => p.id === product.id);
        if (existingProductIndex >= 0) {
            this.items[existingProductIndex].quantity += quantity;
        } else {
            this.items.push({ ...product, quantity });
        }
        this.updateLocalStorage();
    }
    removeProduct(productId) {
        this.items = this.items.filter(p => p.id !== productId);
    }
    calculateTotal() {
      return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
    listBasketItems() {
        this.items.forEach(item => {
            console.log(`${item.name}: ${item.quantity} шт. - ${item.price} за шт.`);
        });
    }
    updateLocalStorage() {
        localStorage.setItem('basket', JSON.stringify(this));
    }

    increment(productId) {
        const product = this.items.find(p => p.id == productId);
        if (product) {
            product.quantity += 1;
            this.updateLocalStorage();
            this.updateUI();
        }
    }

    decrement(productId) {
        const productIndex = this.items.findIndex(p => p.id == productId);
        if (productIndex >= 0) {
            const product = this.items[productIndex];
            product.quantity -= 1;
            if (product.quantity <= 0) {
                this.items.splice(productIndex, 1);
            }
            this.updateLocalStorage();
            this.updateUI();
        }
    }

    updateUI() {
        displayBasketItems(this);
    }
}