let cartJson = localStorage.getItem('cart');
let cart = JSON.parse(cartJson);

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
    quantity.textContent = 'qté : ';
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
    deleteItem.addEventListener('click', (event) => deleteProduct(product, event));
    return cartItem;
}

function calculPrice() {
    const totalCart = cart.reduce(function (accumulateur, valeurCourante) {
        return accumulateur + (valeurCourante.price * valeurCourante.quantity);
    }, 0)
    const total = document.getElementById('totalPrice');
    total.textContent = totalCart;
}

function modifProduct(product, event) {
    const changeQuantity = parseInt(event.target.value);
    product.quantity = changeQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    calculPrice();
}

function deleteProduct(product, event) {
    console.log(event.target)
    console.log(event.target.closest('.cart__item'))
    event.target.closest('.cart__item').remove();

    console.log(product);
    const findById = (itemProduct) => product.id === itemProduct.id && product.color === itemProduct.color;
    const index = cart.findIndex(findById);
    console.log(index);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    calculPrice();
}

function formSubmit(event) {
    event.preventDefault();
    const contact = {
        lastName: event.target.lastName.value,
        firstName: event.target.firstName.value,
        address: event.target.address.value,
        city: event.target.city.value,
        email: event.target.email.value,
    }
    console.log(contact);


    //mon code
    // const products = [];
    // for (let product of cart){
    //     products.push(product.id)
    // }

    //code conseillé
    //Utiliser map pour changer le format d'objets dans un tableau
    // const tableauFormat = cart.map(product => {
    //     return product.id;
    // })

    // code réduit
    const products = cart.map(product => product.id)

    // mon code
    const requestBody = {contact, products};
    console.log(requestBody);
    const URL = "http://localhost:3000/api/products/order";

    fetch(URL, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json()) // transforme la réponse en objet JSON
        .then(json => {
            let idOrder = json.orderId
            const urlConfirmation = URL + idOrder;
            console.log(json)
            console.log(urlConfirmation);


            window.location.assign('./confirmation.html?idOrder=' + idOrder);


            // const orderId = document.getElementById("orderId");
            // orderId.textContent = urlConfirmation;

        }) // fait ce que je veux avec la réponse JSON
        .catch(err => console.log(err));

}



let search_params = new URLSearchParams(window.location.search);
console.log(window.location);

if (search_params.has('idOrder')) {
    const idOrder = search_params.get('idOrder');
    const orderId = document.getElementById("orderId");
    orderId.textContent = idOrder;
}
else {

    const cartItems = document.getElementById('cart__items');

    for (let product of cart) {
        const productElement = renderProduct(product)
        cartItems.append(productElement);
    }

    calculPrice();

    const form = document.querySelector('form');

    form.addEventListener('submit', formSubmit);
}




















