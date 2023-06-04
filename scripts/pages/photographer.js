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
    sectionInfo.setAttribute("class", "info-photograph .photographer_section article");
    photographerInfoSection.appendChild(sectionInfo);

    const sectionPicture = document.createElement("section");
    sectionPicture.setAttribute("class", "picture-photograph container-img img");
    photographerInfoSection.appendChild(sectionPicture);

    // const photographerPortrait = document.createElement("img");
    // photographerPortrait.src = `assets/photographers/${portrait}`;
    // sectionPicture.appendChild(photographerPortrait);



const mediaContainer = document.createElement("div");
const media = document.createElement("div");

const fileExtension = portrait.split('.').pop().toLowerCase();

if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") {
  const image = document.createElement("img");
  image.src = `assets/photographers/${portrait}`;
  media.appendChild(image);
} else if (fileExtension === "mp4" || fileExtension === "webm" || fileExtension === "ogg") {
  const video = document.createElement("video");
  video.src = `assets/photographers/${portrait}`;
  video.controls = true; // Ajouter des contrôles vidéo
  media.appendChild(video);
}

mediaContainer.appendChild(media);
sectionPicture.appendChild(mediaContainer);



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

    const mainContent = document.getElementById("main");

    //filtre
    const filtrePhotos = document.createElement("section")
    filtrePhotos.setAttribute("class","filtre");
    mainContent.appendChild(filtrePhotos);

    const labelFiltre = document.createElement("section")
    filtrePhotos.setAttribute("for","select-filter");
    filtrePhotos.textContent ="Trier par";
    filtrePhotos.appendChild(labelFiltre);

    const selectFiltre = document.createElement('select')
    selectFiltre.setAttribute("id","select-filter");
    selectFiltre.setAttribute("name","select-filter");
    filtrePhotos.appendChild(selectFiltre);


    const optionOne = document.createElement('option')
    optionOne.setAttribute("value","popular");
    optionOne.textContent = "Popularité";
    selectFiltre.appendChild(optionOne);

    const optionTwo = document.createElement('option')
    optionTwo.setAttribute("value","date");
    optionTwo.textContent = "Date";
    selectFiltre.appendChild(optionTwo);

    const optionTree = document.createElement('option')
    optionTree.setAttribute("value","Titre");
    optionTree.textContent = "Titre";
    selectFiltre.appendChild(optionTree);


    // Galerie de photos
  
    const photoGallery = document.createElement("section");
    photoGallery.setAttribute("class", "photo-gallery");
    mainContent.appendChild(photoGallery);

    const photographerPhotos = await getPhotographerPhotos(id);
    photographerPhotos.forEach((photo) => {
      const photoContainer = document.createElement("article");
      photoContainer.setAttribute("class", "photo-container");
      photoGallery.appendChild(photoContainer);

      //chaque éléments

      const photoImage = document.createElement("img");
      photoImage.setAttribute("class","box-img")
      photoImage.src = `assets/photographers/${photo.image}`;
      photoImage.alt = photo.title;
      photoContainer.appendChild(photoImage);

      const footerArticleInfo = document.createElement("div")
      footerArticleInfo.setAttribute("class","info-photo")
      photoContainer.appendChild(footerArticleInfo)

      const photoTitle = document.createElement("h3");
      photoTitle.setAttribute("class","title-photo")
      photoTitle.textContent = photo.title;
      footerArticleInfo.appendChild(photoTitle);

      const photoLikes = document.createElement("p");
      photoLikes.setAttribute("class","like-photo")
      footerArticleInfo.appendChild(photoLikes);

      const iconLikes = document.createElement("i")
      iconLikes.setAttribute("class","fa-solid fa-heart")
      photoLikes.appendChild(iconLikes)

      const numberLikes = document.createElement("span");
      numberLikes.textContent = `${photo.likes}`
      photoLikes.appendChild(numberLikes)

      const modalContactName = document.querySelector(".modal header h2");
      modalContactName.innerHTML =`Contactez-moi<br>${photographer.name}`;
      modalContactName.setAttribute("class","title-name-contact")
      


      // const photoDate = document.createElement("p");
      // photoDate.textContent = `Date: ${photo.date}`;
      // photoContainer.appendChild(photoDate);

      // const photoPrice = document.createElement("p");
      // photoPrice.textContent = `Price: $${photo.price}`;
      // photoContainer.appendChild(photoPrice);
    });
  } else {
    console.error(`Le photographe avec l'identifiant '${id}' n'a pas été trouvé.`);
  }
}
displayPhotographerInfo();