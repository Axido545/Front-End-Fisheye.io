/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
// fonction  photographerFactory, paramètre data.
function photographerFactory(data) {
  // l'intérieur de la fonction, l'objet data est destructuré pour extraire les propriétés name et portrait.
  const { name, portrait, city, country, tagline, price, id } = data;
  // c'est le chemin de l'image
  const picture = `assets/photographers/${portrait}`;
  const contanerImg = "container-img";
  // fonction getUserCardDOM l'intérieur de la fonction photographerFactory
  function getUserCardDOM() {
    const article = document.createElement("article");
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const pLocation = document.createElement("p");
    const pTagline = document.createElement("p");
    const pPrice = document.createElement("p");
    // l'attribut source de l'image reprend le chemin plus haut
    img.setAttribute("src", picture);
    img.setAttribute("alt", `La photo du photographe${name}`);
    divImg.setAttribute("class", contanerImg);
    pLocation.setAttribute("class", "location");
    pTagline.setAttribute("class", "tagline");
    pPrice.setAttribute("class", "price");
    // Elle assigne la valeur de name à la propriété textContent de l'élément h2.
    h2.textContent = name;
    pLocation.textContent = `${city}, ${country}`;
    pTagline.textContent = tagline;
    pPrice.textContent = `${price} €/jour`;
    // Les éléments img et h2 sont ensuite ajoutés à l'élément article.
    article.appendChild(divImg);
    article.appendChild(img);
    divImg.appendChild(img);
    article.appendChild(h2);
    article.appendChild(pLocation);
    article.appendChild(pTagline);
    article.appendChild(pPrice);
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`); // ajout de l'id
    link.setAttribute(
      "aria-label",
      `Cliquez pour voir tous les photos du photographe ${name}`,
    );
    link.appendChild(article);

    const elements = document.querySelectorAll("*");

    // Parcourir chaque élément et ajouter l'attribut "tabindex"
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute("tabindex", "0");
    }

    const body = document.querySelector("body");
    const headerTop = document.querySelector("header");
    const main = document.querySelector("main");

    const wrap = document.createElement("div");
    wrap.appendChild(headerTop);
    wrap.appendChild(main);
    body.appendChild(wrap);
    wrap.setAttribute("class", "wrap");
    wrap.style.width = "1240 px";
    return link;
  }
  return { name, picture, getUserCardDOM };
}
