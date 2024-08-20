const header =document.querySelector("header");

let counter = 1;
setInterval(function() {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 3) {
        counter = 1;
    }
}, 5000);

//Login
document.addEventListener('DOMContentLoaded', () => {
    const signupLink = document.getElementById('signup-link');
    const loginLink = document.getElementById('login-link');
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');

    signupLink.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    loginLink.addEventListener('click', () => {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
});




// Toggle submenu display on click (optional for touch devices)
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.navmenu .dropdown');

    dropdown.addEventListener('click', function(event) {
        event.stopPropagation();
        this.querySelector('.submenu').classList.toggle('show');
    });

    document.addEventListener('click', function() {
        document.querySelector('.submenu').classList.remove('show');
    });
});



//Cart 
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.cart-modal .close');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    let cartItems = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            const productName = this.getAttribute('data-product-name');
            const productImage = this.getAttribute('data-product-image');
            const productPrice = parseFloat(this.getAttribute('data-product-price').replace(/[^0-9.-]+/g,"")); // Convert to number
            
            const existingItemIndex = cartItems.findIndex(item => item.id === productId);
            if (existingItemIndex === -1) {
                cartItems.push({ id: productId, name: productName, image: productImage, price: productPrice, quantity: 1 });
            } else {
                cartItems[existingItemIndex].quantity += 1;
            }
            cartCountElement.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            alert(productName + ' has been added to the cart!');
        });
    });

    document.getElementById('cart-icon').addEventListener('click', function (e) {
        e.preventDefault();
        updateCartModal();
        cartModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function () {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    cartItemsElement.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.getAttribute('data-index');
            cartItems.splice(index, 1);
            cartCountElement.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            updateCartModal();
        } else if (event.target.classList.contains('quantity-increase')) {
            const index = event.target.getAttribute('data-index');
            cartItems[index].quantity += 1;
            updateCartModal();
        } else if (event.target.classList.contains('quantity-decrease')) {
            const index = event.target.getAttribute('data-index');
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
                updateCartModal();
            }
        }
    });

    checkoutBtn.addEventListener('click', function () {
        if (cartItems.length > 0) {
            alert('Proceeding to checkout...');
            // Implement your checkout logic here
        } else {
            alert('Your cart is empty!');
        }
    });

    function updateCartModal() {
        cartItemsElement.innerHTML = '';
        let totalPrice = 0;
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <span>${item.name}</span>
                        <span>₱${item.price.toFixed(2)}</span>
                        <div class="quantity-controls">
                            <button class="quantity-decrease" data-index="${index}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-increase" data-index="${index}">+</button>
                        </div>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsElement.appendChild(li);
            totalPrice += item.price * item.quantity;
        });

        // Format total price with commas
        cartTotalPriceElement.textContent = `₱${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    
})
// Searchbar
document.addEventListener('DOMContentLoaded', function() {
    // Get the search query from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query') ? urlParams.get('query').toLowerCase() : '';

    // Select all product boxes
    const productBoxes = document.querySelectorAll('.product-box');

    // If there's a search query, filter products based on the query
    if (query) {
        productBoxes.forEach(box => {
            const productName = box.querySelector('.product-text h4').innerText.toLowerCase();
            // Check if product name includes the query
            if (productName.includes(query)) {
                box.classList.remove('hidden'); // Show product if it matches the query
            } else {
                box.classList.add('hidden'); // Hide product if it does not match the query
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var searchForm = document.getElementById('search-form');
    var searchInput = document.querySelector('input[name="query"]');

    searchForm.addEventListener('submit', function(event) {
        if (searchInput.value.trim() === "") {
            event.preventDefault();
        }
    });
});