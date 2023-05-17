
//fonction  photographerFactory, paramètre data.
function photographerFactory(data) {

// l'intérieur de la fonction, l'objet data est destructuré pour extraire les propriétés name et portrait.
    const { name, portrait } = data;

   
    //c'est le chemin de l'image
    const picture = `assets/photographers/${portrait}`;

    
    //fonction getUserCardDOM l'intérieur de la fonction photographerFactory
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
         const h2 = document.createElement( 'h2' );


// l'attribut source de l'image reprend le chemin plus haut

        img.setAttribute("src", picture)
       

        // Elle assigne la valeur de name à la propriété textContent de l'élément h2. 

        h2.textContent = name;

        // Les éléments img et h2 sont ensuite ajoutés à l'élément article.
        article.appendChild(img);
        article.appendChild(h2);

        //l'élément article est renvoyé.
        return (article);
    }


     // La fonction photographerFactory renvoie un objet avec trois propriétés : 
    return { name, picture, getUserCardDOM }
   // name (qui est la valeur extraite de data), 
  // picture (qui est la valeur de la variable picture), 
 // et getUserCardDOM (qui est la fonction getUserCardDOM définie à l'intérieur de photographerFactory)
}