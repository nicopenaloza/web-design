import { CartItem } from "./components/CartItem.js";
import { CartCard } from "./components/CartCard.js"; // <<< NUEVO
import { LOCAL_STORAGE_CART_KEY, PRODUCTS } from "./constants.js";

const getCart = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY) ?? "[]");

export const getCartItems = () => {
  return getCart().map(i => ({ product: PRODUCTS.find(product => product.id == i.item), quantity: i.quantity }));
}

const updateNavCartItems = () => {
  const counterContainer = document.getElementById("nav-cart-bubble");
  const counter = document.getElementById("nav-cart-quantity");
  const count = getCartItems().reduce((a,b) => a + b.quantity, 0);

  if (count > 0 && counterContainer.classList.contains("hidden")) counterContainer.classList.toggle("hidden");
  counter.innerHTML = count;
}

export const addToCart = (product) => {
  const currentCart = getCart();
  const index = currentCart.findIndex(i => i.item == product);

  if (index < 0) {
    currentCart.push({ item: product, quantity: 1 });
  } else {
    currentCart[index].quantity = currentCart[index].quantity + 1;
  }

  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(currentCart));
  updateNavCartItems();
}

export const removeFromCart = (productId) => {
  const currentCart = getCart();
  const index = currentCart.findIndex(i => i.item == productId);
  if (index >= 0) currentCart.splice(index, 1);
  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(currentCart));
  updateNavCartItems();
  summarizeCart();
  listItems();
};

export const updateCartItemQuantity = (productId, newQuantity) => {
  const currentCart = getCart();
  const index = currentCart.findIndex(i => i.item == productId);

  if (index < 0) {
    throw new Error('No existe ese producto en el carrito');
  }

  const qty = Math.max(0, parseInt(newQuantity) || 0);
  currentCart[index].quantity = qty;

  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(currentCart));
  updateNavCartItems();
  summarizeCart();
};

const listItems = () => {
  const tableEl = document.getElementById("cart-items-container");
  const tableBody = document.getElementById("cart-items");
  const cardsEl = document.getElementById("cart-cards-container");
  const noItems = document.getElementById("no-items-cart-message");

  if (!tableEl || !tableBody || !cardsEl || !noItems) return;

  const items = getCartItems();

  tableBody.innerHTML = '';
  cardsEl.innerHTML = '';

  items.forEach(({ product, quantity }) => {
    tableBody.appendChild(CartItem(product, quantity));
  });

  items.forEach(({ product, quantity }) => {
    cardsEl.appendChild(CartCard(product, quantity));
  });

  if (items.length > 0) {
    tableEl.classList.remove("hidden");
    cardsEl.classList.remove("hidden");
    noItems.classList.add("hidden");
  } else {
    tableEl.classList.add("hidden");
    cardsEl.classList.add("hidden");
    noItems.classList.remove("hidden");
  }
};

const summarizeCart = () => {
  const totalText = document.getElementById('summary-total');
  const savingsText = document.getElementById('summary-savings');

  if (!totalText || !savingsText) return;

  const { total, savings } = getCartItems().reduce(
    (acum, current) => {
      const quantity = current.quantity;
      acum.total += current.product.getPrice() * quantity;
      acum.savings += (current.product.price * quantity) - (current.product.getPrice() * quantity);
      return acum;
    }, { total: 0, savings: 0 }
  );

  const formatNumber = (value) => {
    if (value >= 100_000_000) {
      const exponent = Math.floor(Math.log10(value));
      const base = (value / Math.pow(10, exponent)).toFixed(2);
      return `${base}×10^${exponent}`;
    }
    return value.toLocaleString("es");
  };

  totalText.innerText = `$ ${formatNumber(total)}`;
  savingsText.innerText = `$ ${formatNumber(savings)}`;
};

// Exports
window.addToCart = addToCart

updateNavCartItems();
listItems();
summarizeCart();