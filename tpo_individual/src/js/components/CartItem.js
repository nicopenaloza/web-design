import { DeleteButton } from "./DeleteButton.js";
import { updateCartItemQuantity, removeFromCart } from "../cart.js";

export const CartItem = (product, quantity) => {
    const row = document.createElement("tr");
    row.classList.add("cart-item");
    row.dataset.productId = product.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;

    const unitPriceCell = document.createElement("td");
    unitPriceCell.textContent = `$${product.getPrice().toLocaleString("es")}`;

    const qtyCell = document.createElement("td");
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.value = String(quantity);
    qtyInput.classList.add("cart-item-quantity");
    qtyCell.appendChild(qtyInput);

    const totalCell = document.createElement("td");
    const renderTotal = () => {
        const q = Math.max(0, parseInt(qtyInput.value) || 0);
        const total = product.getPrice() * q;
        totalCell.textContent = `$${total.toLocaleString("es")}`;
    };
    renderTotal();

    qtyInput.addEventListener("input", () => {
        updateCartItemQuantity(product.id, qtyInput.value);
        renderTotal();
    });

    const actionsCell = document.createElement("td");
    const deleteButton = DeleteButton();
    deleteButton.addEventListener("click", () => {
        removeFromCart(product.id);
        row.remove();
    });
    actionsCell.appendChild(deleteButton);

    row.append(nameCell, unitPriceCell, qtyCell, totalCell, actionsCell);
    return row;
};