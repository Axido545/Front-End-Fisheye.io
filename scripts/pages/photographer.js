async function getPhotographerData() {
  try {
    const response = await fetch('data/photographers.json');
    if (!response.ok) {
      throw new Error("Une erreur s'est produite lors de la récupération des données des photographes.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getPhotographerIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  return id ? parseInt(id) : null;
}

async function getPhotographerById(photographerId) {
  const data = await getPhotographerData();
  if (data) {
    const photographer = data.photographers.find(photographer => photographer.id === photographerId);
    return photographer ? { photographer } : { photographer: null };
  }
  return { photographer: null };
}

async function init() {
  const id = getPhotographerIdFromURL();
  if (id) {
    const { photographer } = await getPhotographerById(id);  
    if (photographer) {
      console.log(photographer);
      // Utilisez les données du photographe pour afficher les informations nécessaires
    } else {
      console.error(`Le photographe avec l'identifiant '${id}' n'a pas été trouvé.`);
    }
  } else {
    console.error("Aucun identifiant de photographe spécifié dans l'URL.");
  }
}
init();
async function getPhotographerPhotos(photographerId) {
  try {
    const response = await fetch('data/photographers.json');
    if (!response.ok) {
      throw new Error("Une erreur s'est produite lors de la récupération des données des photographes.");
    }
    const data = await response.json();
    const photographerPhotos = data.media.filter(photo => photo.photographerId === photographerId);
    return photographerPhotos;
  } catch (error) {
    console.error(error);
    return [];
  }
}
//ajout du lien vers l'accueil
const logo  = document.querySelector(".logo");
const header = document.querySelector("header");
const logoLink = document.createElement("a");
logoLink.setAttribute("href", "index.html");
logoLink.appendChild(logo)
header.appendChild(logoLink);


/////////////////////////////////////affichage des éléments header ///////////////////////////////////////
//fonction  photographerFactory, paramètre data.
async function displayPhotographerInfo() {
  const id = getPhotographerIdFromURL();
  const { photographer } = await getPhotographerById(id);

  if (photographer) {
    const photographerInfoSection = document.querySelector(".photograph-header");
    const portrait = photographer.portrait;

    // Partie info du photographe
    const sectionInfo = document.createElement("section");
    sectionInfo.setAttribute("class", "info-photograph article");
    photographerInfoSection.appendChild(sectionInfo);

    const sectionPicture = document.createElement("section");
    sectionPicture.setAttribute("class", "picture-photograph container-img img");
    photographerInfoSection.appendChild(sectionPicture);

    const img = document.createElement("img");
    const picture = `assets/photographers/${portrait}`;
    img.setAttribute("src", picture);
    sectionPicture.appendChild(img);

    const photographerName = document.createElement("h2");
    photographerName.setAttribute("class", "photographer-name");
    photographerName.textContent = photographer.name;
    sectionInfo.appendChild(photographerName);

    const photographerLocation = document.createElement("p");
    photographerLocation.setAttribute("class", "location");
    photographerLocation.textContent = ` ${photographer.city}, ${photographer.country}`;
    sectionInfo.appendChild(photographerLocation);

    const photographerTagline = document.createElement("p");
    photographerTagline.setAttribute("class", "tagline");
    photographerTagline.textContent = `${photographer.tagline}`;
    sectionInfo.appendChild(photographerTagline);

    
  } else {
    console.error(`Le photographe avec l'identifiant '${id}' n'a pas été trouvé.`);
  }
}
displayPhotographerInfo();