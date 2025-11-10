// Data for perfumes
const perfumes = [
  {
    id: 1,
    name: 'Mystic Rose',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Ocean Breeze',
    price: 52.5,
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Amber Nights',
    price: 60.0,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Citrus Burst',
    price: 38.75,
    image: 'https://images.unsplash.com/photo-1531840934734-dc1361e8d9a3?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Lavender Mist',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=400&q=80',
  },
];

// Cart object to hold items
let cart = {};

// DOM elements
const productsGrid = document.getElementById('products-grid');
const cartSection = document.getElementById('cart');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const cartCountSpan = document.getElementById('cart-count');
const cartBtn = document.getElementById('cart-btn');
const checkoutBtn = document.getElementById('checkout-btn');

// Load products to page
function loadProducts() {
  perfumes.forEach((perfume) => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="${perfume.image}" alt="${perfume.name}" class="product-image" />
      <h3 class="product-name">${perfume.name}</h3>
      <p class="product-price">$${perfume.price.toFixed(2)}</p>
      <button class="add-to-cart-btn" data-id="${perfume.id}">Add to Cart</button>
    `;

    productsGrid.appendChild(card);
  });
}

// Add item to cart
function addToCart(id) {
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    const product = perfumes.find((p) => p.id === id);
    cart[id] = { ...product, qty: 1 };
  }
  updateCart();
}

// Remove item from cart
function removeFromCart(id) {
  delete cart[id];
  updateCart();
}

// Update cart display and count
function updateCart() {
  cartItemsDiv.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  for (const id in cart) {
    const item = cart[id];
    total += item.price * item.qty;
    itemCount += item.qty;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <span class="cart-item-name">${item.name} (x${item.qty})</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
      <button class="remove-btn" data-id="${id}">Remove</button>
    `;

    cartItemsDiv.appendChild(cartItem);
  }

  cartTotalSpan.textContent = total.toFixed(2);
  cartCountSpan.textContent = itemCount;

  if (itemCount === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
  }
}

// Toggle cart visibility
function toggleCart() {
  cartSection.classList.toggle('hidden');
}

// Event listeners
productsGrid.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
});

cartItemsDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const id = e.target.dataset.id;
    removeFromCart(id);
  }
});

cartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleCart();
});

checkoutBtn.addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Thank you for your purchase! Your order has been processed.');
  cart = {};
  updateCart();
  toggleCart();
});

// Initialize
loadProducts();
updateCart();
