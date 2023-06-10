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
    //fonction  photographerFactory, paramètre data.
async function displayPhotographerInfo() {
  const id = getPhotographerIdFromURL();
  const { photographer } = await getPhotographerById(id);

  if (photographer) {
    const photographerInfoSection = document.querySelector(".photograph-header");
    const portrait = photographer.portrait;

    const mainContent = document.getElementById("main");

    const modalContactName = document.querySelector(".modal header h2");
      modalContactName.innerHTML =`Contactez-moi<br>${photographer.name}`;
      modalContactName.setAttribute("class","title-name-contact")

    // Galerie de photos
  
    const photoGallery = document.createElement("section");
    photoGallery.setAttribute("class", "photo-gallery");
    mainContent.appendChild(photoGallery);

    const photographerPhotos = await getPhotographerPhotos(id);
    photographerPhotos.forEach((photo) => {
      const photoContainer = document.createElement("article");
      photoContainer.setAttribute("class", "photo-container");
      photoGallery.appendChild(photoContainer);

      if(photo.image == undefined){
        const photoVideo = document.createElement("video");
        photoVideo.setAttribute("class","box-img")
        photoContainer.appendChild(photoVideo);
        const photoVideoSource = document.createElement("source");
        photoVideoSource.src=`assets/photographers/${photo.video}`;
        photoVideoSource.type ="video/mp4";
        photoVideo.appendChild(photoVideoSource) 
      
      }

      if (photo.video == undefined){
        const photoImage = document.createElement("img");
        photoImage.setAttribute("class","box-img")
        photoImage.src = `assets/photographers/${photo.image}`;
        photoContainer.appendChild(photoImage);

      }

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

      const numberLikes = document.createElement("span");
      numberLikes.textContent = `${photo.likes}`;
      photoLikes.appendChild(numberLikes);
   
      const iconLikes = document.createElement("i")
      iconLikes.setAttribute("class","fa-regular fa-heart")
      photoLikes.appendChild(iconLikes)

      const sectionTotalPrice = document.createElement("section");
      sectionTotalPrice.setAttribute("class","section-total-price")
      mainContent.appendChild(sectionTotalPrice);

      const likeSectionPrice = document.createElement("span");
      likeSectionPrice.setAttribute("class","like-section-price")
      sectionTotalPrice.appendChild(likeSectionPrice)

      const likeValueSectionPrice = document.createElement("span");
      likeValueSectionPrice.setAttribute("class","like-value-section-price")
      likeSectionPrice.appendChild(likeValueSectionPrice)

      const iconLikesValue = document.createElement("i")
      iconLikesValue.setAttribute("class","fa-solid fa-heart")
      likeSectionPrice.appendChild(iconLikesValue)

      const priceVue = document.createElement("span")
      priceVue.textContent = photographer.price + "€ / jour";
      sectionTotalPrice.appendChild(priceVue)

    let totalLikes = 0;
    photographerPhotos.forEach(photo => {
      totalLikes += photo.likes;
    });

var heartIcons = document.querySelectorAll(".fa-heart");

// Parcourir tous les cœurs
heartIcons.forEach(function(iconLikes) {
  iconLikes.addEventListener("click", function() {
    if (!iconLikes.classList.contains("fa-solid")) {
      iconLikes.classList.remove("fa-regular");
      iconLikes.classList.add("fa-solid");
      photo.likes++; // Augmenter le nombre de likes dans l'objet photo
      totalLikes++; // Augmenter le total des likes
    } else {
      iconLikes.classList.remove("fa-solid");
      iconLikes.classList.add("fa-regular");
      photo.likes--; // Diminuer le nombre de likes dans l'objet photo
      totalLikes--; // Diminuer le total des likes
    }
    console.log(totalLikes);
    // Mettre à jour le texte affichant le nombre de likes pour la photo spécifique
    numberLikes.textContent = photo.likes;
    // Mettre à jour l'affichage du total des likes
    updateTotalLikes();
  });
});
function updateTotalLikes() {
  likeValueSectionPrice.textContent = totalLikes;
}
        });

      } else {
        console.error(`Le photographe avec l'identifiant '${id}' n'a pas été trouvé.`);
      }
    }
    displayPhotographerInfo();