const baseURI = "http://localhost:3000/api/products";

const getProductById = (idProduct) => {
    return fetch(baseURI + '/'+ idProduct)
        .then(function (res) { // controle de la réponse
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) { // traitement des données
            console.log(value);
            return value;
        })
        .catch(function (err) {
            console.error('Problème lors de la récupération des produits.', err);
            // Une erreur est survenue
        });
}



const renderProduct = (product) => {
    const itemImg = document.getElementsByClassName("item__img")[0];
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    itemImg.append(img);
    const title = document.getElementById("title");
    title.textContent = product.name;
    const price = document.getElementById("price");
    price.textContent = product.price;
    const description = document.getElementById("description");
    description.textContent = product.description;
    const colors = document.getElementById("colors");
    product.colors.forEach((color) =>{
        colors.options.add(new Option(color, color, false, false));
    })

}


(async function() {
    let search_params = new URLSearchParams(window.location.search);

    if (search_params.has('id')) {
        const id = search_params.get('id');
        const product = await getProductById(id);
        console.log('product', product);
        renderProduct(product)
    }
})();


