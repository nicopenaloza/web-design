import { PRODUCTS } from "./constants.js";
import { ProductCard } from "./components/ProductCard.js"


const isOfferContainer = (container) => !!container.classList.contains("offers");

const containers = document.getElementsByClassName("product-container");

for (let container of containers) {
    PRODUCTS
        .filter(
            p => p.discount > 0 && isOfferContainer(container) || !isOfferContainer(container)
        )
        .forEach(product => {
            container.appendChild(ProductCard(product))
        })
}