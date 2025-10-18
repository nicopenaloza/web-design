export class Product {
    constructor(id, name, image, price, discount = 0) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.discount = discount;
    }

    getPrice() {
        return this.price - (this.price * this.discount / 100);
    }
}
