
// 1- Ajouter fetch dans la fonction getPhotographers pour récupérer
// vos datas, 

/*
Pour ajouter une requête Fetch pour récupérer les données des photographes au lieu de les définir
 directement dans la fonction getPhotographers, vous pouvez modifier la fonction de la manière suivante :
*/


async function getPhotographers() {
    console.log("ouiiiiiiiiiiinnnnnnnnnnn dans la fonction")

    try {

        /*
         Dans cette version modifiée, la fonction utilise l'opérateur await pour attendre la résolution
          de la promesse renvoyée par fetch, qui effectue une requête HTTP pour récupérer les données
           du fichier JSON.

        */
        const response = await fetch('data/photographers.json'); // Remplacez "chemin_vers_le_fichier_JSON" par le chemin réel de votre fichier JSON
        
        
        // Si la requête est réussie (response.ok est true),
        // les données sont extraites de la réponse en utilisant response.json()
        // et renvoyées sous la forme d'un objet contenant le tableau de photographes.

        /*
Si une erreur se produit lors de la requête ou de la conversion en JSON,
l'erreur est capturée et affichée dans la console, et la fonction renvoie
 un objet avec un tableau vide de photographes.
        */

        
        
        if (!response.ok) {

            console.log('ya un groooos souci laaaaa')

            throw new Error('Une erreur s\'est produite lors de la récupération des données des photographes.');
        } else {

            console.log('c ok mais bizard rien apparait')

        }



        const data = await response.json();
        return { photographers: data };
    } catch (error) {
        console.error(error);
        return { photographers: [] }; // Retourne un tableau vide en cas d'erreur
    }
}



async function displayData(photographers) {
            const photographersSection = document.querySelector(".photographer_section");
    
            photographers.forEach((photographer) => {
                const photographerModel = photographerFactory(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                photographersSection.appendChild(userCardDOM);
            });
        };




        async function init() {
                    // Récupère les datas des photographes
                    const { photographers } = await getPhotographers();
                    displayData(photographers);
                };
            
                /*
            Enfin, la fonction init est appelée pour démarrer l'application et afficher les photographes
            dès que le script est exécuté.
                */
                
                init();
                















/******************************************* */

    
    // La fonction getPhotographers est une fonction asynchrone qui simule la récupération de données
    //  de photographes.
    //  Dans cet exemple, les données des photographes sont définies directement
    //  dans la fonction, 
    // *********************************************************************
    //*****mais normalement, elles devraient être récupérée
    //*****  à partir d'un fichier JSON à l'aide de la fonction fetch.
    // *********************************************************************
    


//     async function getPhotographers() {






//         // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
//         // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
//         let photographers = [
//             {
//                 "name": "Ma data test",
//                 "id": 1,
//                 "city": "Paris",
//                 "country": "France",
//                 "tagline": "Ceci est ma data test",
//                 "price": 400,
//                 "portrait": "account.png"
//             },
//             {
//                 "name": "Autre data test",
//                 "id": 2,
//                 "city": "Londres",
//                 "country": "UK",
//                 "tagline": "Ceci est ma data test 2",
//                 "price": 500,
//                 "portrait": "account.png"
//             },
//         ]
//         // et bien retourner le tableau photographers seulement une fois récupéré

// /***********************************************************************
//  * La fonction getPhotographers retourne une promesse
//  * qui se résoudra avec un objet contenant un tableau de photographes.
//  * Chaque photographe est représenté par un objet contenant des propriétés
//  * telles que name, id, city, country, tagline, price et portrait.
// **********************************************************************/


//         return ({
//             photographers: [...photographers, ...photographers, ...photographers]})
//     }


// /*******************************************************************************
// *La fonction displayData prend le tableau de photographes en paramètre
// et affiche les données sur la page HTML. Elle sélectionne l'élément HTML
// avec la classe "photographer_section" à l'aide de document.querySelector.
// Ensuite, elle itère sur chaque photographe et utilise la fonction photographerFactory
// pour créer un modèle de photographe. Ensuite, elle appelle la fonction getUserCardDOM
// sur ce modèle pour obtenir l'élément DOM représentant la carte du photographe. Enfin,
// elle ajoute cet élément à la section des photographes sur la page.
// ******************************************************************************/


//     async function displayData(photographers) {
//         const photographersSection = document.querySelector(".photographer_section");

//         photographers.forEach((photographer) => {
//             const photographerModel = photographerFactory(photographer);
//             const userCardDOM = photographerModel.getUserCardDOM();
//             photographersSection.appendChild(userCardDOM);
//         });
//     };



//     /*****************************************************************
//     *La fonction init est une fonction asynchrone qui initialise l'application.
//     Elle appelle d'abord la fonction getPhotographers pour récupérer les données des photographes.
//      Ensuite, elle appelle la fonction displayData pour afficher ces données sur la page.
//    ********************************************************************** */

//     async function init() {
//         // Récupère les datas des photographes
//         const { photographers } = await getPhotographers();
//         displayData(photographers);
//     };

//     /*
// Enfin, la fonction init est appelée pour démarrer l'application et afficher les photographes
// dès que le script est exécuté.
//     */
    
//     init();
    
