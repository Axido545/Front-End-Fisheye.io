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

/////////////////////////////////////affichage des éléments///////////////////////////////////////


//fonction  photographerFactory, paramètre data.
async function displayPhotographerInfo() {
  const id = getPhotographerIdFromURL();
  const { photographer } = await getPhotographerById(id);

  if (photographer) {
    const photographerInfoSection = document.querySelector(".photograph-header");
    const portrait = photographer.portrait

    // partie info du photograph
    const sectionInfo = document.createElement('section')
    sectionInfo.setAttribute("class","info-photograph")
    photographerInfoSection.appendChild(sectionInfo); 


    const sectionPicture = document.createElement('section')
    sectionPicture.setAttribute("class","picture-photograph container-img img")
    photographerInfoSection.appendChild(sectionPicture);

    const photographerPortrait = document.createElement("img");
    photographerPortrait.src = `assets/photographers/${portrait}`;
     sectionPicture.appendChild(photographerPortrait);



    // 
    const photographerName = document.createElement("h2");
    photographerName.textContent = photographer.name;
    sectionInfo.appendChild(photographerName);

    // const photographerCity = document.createElement("p");
    // photographerCity.textContent = `City: ${photographer.city}`;
    // photographerInfoSection.appendChild(photographerCity);

    // const photographerCountry = document.createElement("p");
    // photographerCountry.textContent = `Country: ${photographer.country}`;
    // photographerInfoSection.appendChild(photographerCountry);

    // const photographerTagline = document.createElement("p");
    // photographerTagline.textContent = `Tagline: ${photographer.tagline}`;
    // photographerInfoSection.appendChild(photographerTagline);

    // const photographerPrice = document.createElement("p");
    // photographerPrice.textContent = `Price: ${photographer.price}`;
    // photographerInfoSection.appendChild(photographerPrice);

    // 
  } else {
    console.error(`Le photographe avec l'identifiant '${id}' n'a pas été trouvé.`);
  }
}

displayPhotographerInfo();