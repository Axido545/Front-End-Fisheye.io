//fonction  photographerFactory, paramètre data.
function photographerFactory(data) {

// l'intérieur de la fonction, l'objet data est destructuré pour extraire les propriétés name et portrait.
    const { name, portrait, city, country,tagline, price } = data;   

    //c'est le chemin de l'image
    const picture = `assets/photographers/${portrait}`;
    const contanerImg = "container-img";

    //fonction getUserCardDOM l'intérieur de la fonction photographerFactory
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const divImg = document.createElement('div')
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const pLocation = document.createElement('p');
        const pTagline = document.createElement('p');
        const pPrice = document.createElement('p');

// l'attribut source de l'image reprend le chemin plus haut
        img.setAttribute("src", picture)
        divImg.setAttribute("class",contanerImg)
        pLocation.setAttribute("class","location")
        pTagline.setAttribute("class","tagline")
        pPrice.setAttribute("class","price")
        
// Elle assigne la valeur de name à la propriété textContent de l'élément h2. 
        h2.textContent = name;
        pLocation.textContent = city +", "+ country;
        pTagline.textContent = tagline;
        pPrice.textContent = price +" €/jour"

 // Les éléments img et h2 sont ensuite ajoutés à l'élément article.
        article.appendChild(divImg);
        article.appendChild(img);
        divImg.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        //l'élément article est renvoyé.
        return (article);
        
    }


     // La fonction photographerFactory renvoie un objet avec trois propriétés : 
    return { name, picture, getUserCardDOM }
   // name (qui est la valeur extraite de data), 
  // picture (qui est la valeur de la variable picture), 
 // et getUserCardDOM (qui est la fonction getUserCardDOM définie à l'intérieur de photographerFactory)
}