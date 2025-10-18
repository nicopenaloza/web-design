import { updateCartItemQuantity, removeFromCart } from "../cart.js";

export const CartCard = (product, quantity) => {
  const card = document.createElement("div");
  card.className = "cart-card";
  card.dataset.productId = product.id;

  const title = document.createElement("div");
  title.className = "cart-card-title";
  title.textContent = product.name;

  const price = document.createElement("div");
  price.className = "cart-card-price";
  const priceLabel = document.createElement("span");
  priceLabel.className = "cart-card-label";
  priceLabel.textContent = "Precio unitario";
  const priceValue = document.createElement("span");
  priceValue.className = "cart-card-value";
  priceValue.textContent = ` $${product.getPrice().toLocaleString("es")}`;
  price.append(priceLabel, priceValue);

  const qty = document.createElement("div");
  qty.className = "cart-card-qty";
  const qtyLabel = document.createElement("span");
  qtyLabel.className = "cart-card-label";
  qtyLabel.textContent = "Cantidad";
  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.min = "1";
  qtyInput.max = "100";
  qtyInput.value = String(quantity);
  qtyInput.classList.add("cart-item-quantity");

  qty.append(qtyLabel, qtyInput);

  const total = document.createElement("div");
  total.className = "cart-card-total";
  const totalLabel = document.createElement("span");
  totalLabel.className = "cart-card-label";
  totalLabel.textContent = "Total";
  const totalValue = document.createElement("span");
  totalValue.className = "cart-card-value";
  const renderTotal = () => {
    const q = Math.max(0, parseInt(qtyInput.value) || 0);
    const t = product.getPrice() * q;

    let displayValue;

    if (t >= 10_000_000) {
      const exponent = Math.floor(Math.log10(t));
      const base = (t / Math.pow(10, exponent)).toFixed(2);
      displayValue = `${base}×10^${exponent}`;
    } else {
      displayValue = t.toLocaleString("es");
    }

    totalValue.textContent = ` $${displayValue}`;
  };
  renderTotal();
  total.append(totalLabel, totalValue);

  const actions = document.createElement("div");
  actions.className = "cart-card-actions";
  const del = document.createElement("button");
  del.className = "primary-button clickable";
  del.setAttribute("aria-label", "Eliminar del carrito");
  del.textContent = "Eliminar";
  del.addEventListener("click", () => {
    removeFromCart(product.id);
    card.remove();
  });
  actions.appendChild(del);

  qtyInput.addEventListener("input", () => {
    updateCartItemQuantity(product.id, qtyInput.value);
    renderTotal();
  });

  card.append(title, price, qty, total, actions);
  return card;
};