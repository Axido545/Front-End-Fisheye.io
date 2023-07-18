async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
    console.log(response);
    if (!response.ok) {
      throw new Error(
        "Une erreur s'est produite lors de la récupération des données des photographes.",
      );
    } else {
    }
    const data = await response.json();
    console.log(data);
    return { photographers: data };
  } catch (error) {
    console.error(error);
    return { photographers: [] }; // Retourne un tableau vide en cas d'erreur
  }
}
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}
// affichage photograph des que script executé
init();

const logo = document.querySelector(".logo");
logo.setAttribute("alt", "Fisheye Logo");

const lang = document.querySelector("html");
lang.setAttribute("lang", "fr");

// Sélectionner tous les éléments HTML de la page
