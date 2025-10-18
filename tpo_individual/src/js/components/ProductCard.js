import { AddToCartButton } from "./AddToCartButton.js"


export const ProductCard = (product) => {
    const card = document.createElement('div');
    const header = document.createElement('div');
    const headerImg = document.createElement('img');
    const productName = document.createElement('h3');
    const footer = document.createElement('div');
    const productPrice = document.createElement('div');
    const productDetails = document.createElement('div');

    let originalPrice = document.createElement('span');
    originalPrice.innerText = `$${product.price.toLocaleString("es")}`;
    originalPrice.classList.add(product.discount > 0 ? "offer-original-price" : "offer-offer-price");
    productPrice.appendChild(originalPrice);

    if (product.discount > 0) {
        const offerPrice = document.createElement('span');
        offerPrice.classList.add("offer-offer-price");
        offerPrice.innerText = `$${product.getPrice().toLocaleString("es")}`;
        productPrice.appendChild(offerPrice);
    }

    productName.innerText = product.name;
    productDetails.classList.add('product-details')
    header.classList.add("product-header");
    productName.classList.add("product-title");
    productPrice.classList.add("product-price");
    footer.classList.add("product-footer");

    headerImg.src = product.image;
    headerImg.alt = product.name;
    header.appendChild(headerImg);

    footer.appendChild(productPrice);
    footer.appendChild(AddToCartButton(product.id));

    card.appendChild(header);
    productDetails.appendChild(productName);
    productDetails.appendChild(footer);
    card.appendChild(productDetails);

    card.classList.add("product-card");
    return card;
}