const baseURI = 'http://localhost:3000/api/products';

/**
 * Récupère tous les produits
 * @returns Promise d'un tableau de produits
 */
const getAllProducts = () => {
    return fetch(baseURI)
        .then(function(res) { // controle de la réponse
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) { // traitement des données
            // console.log(value);
            return value;
        })
        .catch(function(err) {
            console.error('Problème lors de la récupération des produits.', err);
            // Une erreur est survenue
        });
}
const items = document.getElementById("items");

/**
 * Fonction pour afficher un produit
 * @param product
 */
const renderProduct = (product) => {
    const productLink = document.createElement('a');
    productLink.href = './product.html?id=' + product._id;
    const container = document.createElement('article');
    productLink.append(container);
    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    container.append(img);
    const title = document.createElement('h3');
    title.className = 'productName';
    title.textContent = product.name;
    container.append(title);
    const description = document.createElement('p');
    description.className = 'productDescription';
    description.textContent = product.description;
    container.append(description)
    items.append(productLink);
}

/**
 * Fonction principal qui s'exécute au démarrage de la page.
 */
(async function() {
    const products = await getAllProducts();
    console.log('products', products);
    for (const product of products){
        renderProduct(product)
    }

})();


