const baseURI = "http://localhost:3000/api/products/order";


const orderById = () => {
    return fetch(baseURI + "/" + urlConfirmation)
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

