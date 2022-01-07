let cartJson = localStorage.getItem('cart');
let cart = JSON.parse(cartJson);

console.log('ma variable cart:', cart);
// cart.push('toto');
//
console.log('ma variable cartJson:', cartJson);
console.log('mon localstorage:', localStorage.getItem('cart'));

localStorage.setItem('cart', JSON.stringify(cart));
console.log('ma variable cartJson:', cartJson);
console.log('mon localstorage:', localStorage.getItem('cart'));


// const cart2 = cart;
// cart2.push('toto')
// console.log('ma variable cart2:', cart2);
// console.log('ma variable cart:', cart);
//
// let a = 2;
// let b = a;
// b = 5;
//
// console.log(a, b)

const cartItems = document.getElementById('cart__items');

const renderProduct = (product) => {
    const cartItem = document.createElement("article");
    cartItem.className = 'cart__item';
    cartItem.dataset.id = product.id;
    cartItem.dataset.color = product.color;

    // image
    const cartItemImg = document.createElement("div");
    cartItemImg.className = 'cart__item__img';
    cartItem.append(cartItemImg);
    const img = document.createElement('img');
    img.src = product.img;
    img.alt = product.imgAlt;
    cartItemImg.append(img);

    const cartItemContent = document.createElement("div");
    cartItemContent.className = 'cart__item__content';
    cartItem.append(cartItemContent);

    const cartItemContentDescription = document.createElement("div");
    cartItemContentDescription.className = 'cart__item__content__description';
    cartItemContent.append(cartItemContentDescription);

    const title = document.createElement('h2');
    title.textContent = product.name;
    cartItemContentDescription.append(title);
    const color = document.createElement('p');
    color.textContent = product.color;
    cartItemContentDescription.append(color);
    const price = document.createElement('p');
    price.textContent = product.price + ' €';
    cartItemContentDescription.append(price);

    const cartItemContentSetting = document.createElement("div");
    cartItemContentSetting.className = 'cart__item__content__settings';
    cartItem.append(cartItemContentSetting);
    const cartItemContentSettingQuantity = document.createElement('div');
    cartItemContentSettingQuantity.className = 'cart__item__content__settings__quantity';
    cartItemContentSetting.append(cartItemContentSettingQuantity);

    const quantity = document.createElement("p");
    quantity.textContent = 'qté : ' ;
    cartItemContentSettingQuantity.append(quantity);
    const itemQuantity = document.createElement('input');
    itemQuantity.type = 'number';
    itemQuantity.className = 'itemQuantity';
    itemQuantity.name = 'itemQuantity';
    itemQuantity.min = '1';
    itemQuantity.max = '100';
    itemQuantity.value = product.quantity;
    cartItemContentSettingQuantity.append(itemQuantity);
    itemQuantity.addEventListener('change', (event) => modifProduct(product, event));

    const cartItemContentSettingDelete = document.createElement('div');
    cartItemContentSettingDelete.className = 'cart__item__content__settings__delete';
    cartItemContentSetting.append(cartItemContentSettingDelete);
    const deleteItem = document.createElement('p');
    deleteItem.className = 'deleteItem';
    deleteItem.textContent = 'supprimer';
    cartItemContentSettingDelete.append(deleteItem);
    cartItems.append(cartItem);
    deleteItem.addEventListener('click', (event) => deleteProduct(product, event));

}


for (let product of cart){
    renderProduct(product)
}

function modifProduct(product, event) {
    const changeQuantity = parseInt(event.target.value);
    product.quantity = changeQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function deleteProduct(product, event){
    console.log(event.target)
    console.log(event.target.closest('.cart__item'))
    event.target.closest('.cart__item').remove();

    console.log(product);
    const findById = (itemProduct) => product.id === itemProduct.id && product.color === itemProduct.color;
    const index = cart.findIndex(findById);
    console.log(index);
    // delete cart[index];
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
}







console.log(cart);



