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
let totalLikes = 0;
//fonction  photographerFactory, paramètre data.
async function displayPhotographerInfo() {
  const id = getPhotographerIdFromURL();
  const { photographer } = await getPhotographerById(id);

  if (photographer) {
    const photographerInfoSection = document.querySelector(".photograph-header");
    const portrait = photographer.portrait;
     const mainContent = document.getElementById("main");

////////////FILTRE affichage HTML

const filtrePhotos = document.createElement("section")
filtrePhotos.setAttribute("class","filtre");
mainContent.appendChild(filtrePhotos);
    
const labelFiltre = document.createElement("section")
filtrePhotos.setAttribute("for","select-filter");
filtrePhotos.textContent ="Trier par";
filtrePhotos.appendChild(labelFiltre);
    
const selectFiltre = document.createElement('select')
selectFiltre.setAttribute("aria-label","Filtres");
selectFiltre.setAttribute("id","select-filter");
selectFiltre.setAttribute("name","select-filter");
filtrePhotos.appendChild(selectFiltre);
    
const optionOne = document.createElement('option')
optionOne.setAttribute("aria-label","Popularité");
optionOne.setAttribute("value","popular");
optionOne.textContent = "Popularité";
selectFiltre.appendChild(optionOne);
    
const optionTwo = document.createElement('option')
optionOne.setAttribute("aria-label","Date");
optionTwo.setAttribute("value","date");
optionTwo.textContent = "Date";
selectFiltre.appendChild(optionTwo);
    
const optionThree = document.createElement('option')
optionOne.setAttribute("aria-label","Titre");
optionThree.setAttribute("value","Titre");
optionThree.textContent = "Titre";
selectFiltre.appendChild(optionThree);

///////////FILTRE EVENT
optionOne.addEventListener("click", function() {
  // Sélection tous les éléments avec la classe "photo-container"
  let mediaElements = document.querySelectorAll(".photo-container");
  // Convertion les éléments en un tableau
  let mediaArray = Array.from(mediaElements);
 // Trie les éléments par popularité (avec la classe "number-likes")
 mediaArray.sort(function(a, b) {
   let likesA = parseInt(a.querySelector(".number-likes").textContent);
   let likesB = parseInt(b.querySelector(".number-likes").textContent);
   return likesB - likesA;
 });
 // Réinsértion les éléments triés dans leur conteneur d'origine
 let  mediaContainer = document.querySelector(".photo-gallery");
 mediaArray.forEach(function(media) {
   mediaContainer.appendChild(media);
 });
 });

optionTwo.addEventListener("click", function() {
  // Sélectionnez tous les éléments avec la classe "photo-container"
  let mediaContainers = document.querySelectorAll(".photo-container");
  // Convertissez les éléments en un tableau
  let mediaArray = Array.from(mediaContainers);
  // Triez les éléments par date
  mediaArray.sort(function(a, b) {
    let dateA = new Date(a.querySelector("img, video").getAttribute("data-date"));
    let dateB = new Date(b.querySelector("img, video").getAttribute("data-date"));
    return dateA - dateB;
  });
  // Réinsérez les éléments triés dans leur conteneur d'origine
  let mediaContainer = document.querySelector(".photo-gallery");
  mediaArray.forEach(function(media) {
    mediaContainer.appendChild(media);
  });
  });
    
optionThree.addEventListener("click", function() {
// Sélectionnez tous les éléments avec la classe "photo-container"
let mediaElements = document.querySelectorAll(".photo-container");
// Convertissez les éléments en un tableau
let mediaArray = Array.from(mediaElements);
// Triez les éléments par titre
mediaArray.sort(function(a, b) {
  let titleA, titleB;
  let imgElementA = a.querySelector("img");
  let videoElementA = a.querySelector("video");
    if (imgElementA) {
      titleA = imgElementA.getAttribute("title");
    } else if (videoElementA) {
      var sourceElementA = videoElementA.querySelector("source");
     if (sourceElementA) {
      titleA = sourceElementA.getAttribute("title");
    }
}
let imgElementB = b.querySelector("img");
let videoElementB = b.querySelector("video");
  if (imgElementB) {
    titleB = imgElementB.getAttribute("title");
  } else if (videoElementB) {
    let sourceElementB = videoElementB.querySelector("source");
  if (sourceElementB) {
    titleB = sourceElementB.getAttribute("title");
    }
  }
  return titleA.localeCompare(titleB);
      });
// Réinsérez les éléments triés dans leur conteneur d'origine
let  mediaContainer = document.querySelector(".photo-gallery");
mediaArray.forEach(function(media) {
  mediaContainer.appendChild(media);
  });
});
    
const bgModalLightBox = document.createElement("section");
bgModalLightBox.setAttribute("class", "bg-modal-lightbox")
const bodyPage = document.querySelector("body");
bodyPage.appendChild(bgModalLightBox)



 // Galerie de photos
const photoGallery = document.createElement("section");
photoGallery.setAttribute("class", "photo-gallery");
mainContent.appendChild(photoGallery);

const photographerPhotos = await getPhotographerPhotos(id);
photographerPhotos.forEach((photo) => {
const photoContainer = document.createElement("article");
photoContainer.setAttribute("class", "photo-container");
photoGallery.appendChild(photoContainer);

const lightboxLink = document.createElement("a");
lightboxLink.setAttribute("class","link-lightbox")
lightboxLink.setAttribute("aria-label","afficher le grand format")
photoContainer.appendChild(lightboxLink)


function closLightbox(){
  bgModalLightBox.style.display ="none";

}

function openLightbox(){
  bgModalLightBox.style.display ="block";

}
///////////////////////////LIGHTBOX event/////////////////////////////////
lightboxLink.addEventListener("click", function(){
  
  openLightbox();

  const sectionInnerLightBox = document.createElement("section");
  sectionInnerLightBox.setAttribute("class", "section-inner-lightbox");
  bgModalLightBox.appendChild(sectionInnerLightBox);

  const arrowLeft = document.createElement("i");
  arrowLeft.setAttribute("class", "fa-solid fa-chevron-left arrow-left");
  sectionInnerLightBox.appendChild(arrowLeft);

  const photoContainerLightbox = document.createElement("div")
  photoContainerLightbox.setAttribute("class","photo-container-lightbox")
  sectionInnerLightBox.appendChild(photoContainerLightbox);

  const imgBigFormat = document.createElement("img");
  imgBigFormat.setAttribute("class","img-big-format");
  sectionInnerLightBox.appendChild(imgBigFormat);
  imgBigFormat.setAttribute("src",`assets/photographers/${photo.image}`);

  if(photo.image == undefined){
    const photoVideoBF = document.createElement("video");
    photoVideoBF.setAttribute("class","img-big-format")
    photoContainerLightbox.appendChild(photoVideoBF);
  
    const photoVideoSourceBF = document.createElement("source");
    photoVideoSourceBF.src=`assets/photographers/${photo.video}`;
    photoVideoSourceBF.type ="video/mp4";
  
    photoVideoSourceBF.setAttribute("data-date",photo.date);
    photoVideoSourceBF.setAttribute("title",photo.title);
    photoVideoSourceBF.setAttribute("alt",photo.title);
    photoVideoSourceBF.setAttribute("controls","");
    photoVideoBF.appendChild(photoVideoSourceBF);
    photoVideoBF.play();
    var mediaTab = document.querySelectorAll(".img-big-format");
  
    mediaTab.forEach(function(photoVideoSourceBF, index) {
      // Ajouter un attribut tabindex à chaque élément
      photoVideoSourceBF.setAttribute("tabindex", index);
    });
  }
  
  if (photo.video == undefined){
    const photoImageBF = document.createElement("img");
    photoImageBF.setAttribute("class","img-big-format")
    photoImageBF.setAttribute("data-date",photo.date)
    photoImageBF.setAttribute("title",photo.title)
    photoImageBF.setAttribute("alt",photo.title)
    photoImageBF.src = `assets/photographers/${photo.image}`;
    photoContainerLightbox.appendChild(photoImageBF);
  
    var mediaTab = document.querySelectorAll(".img-big-format");
  
    mediaTab.forEach(function(photoImageBF, index) {
      // Ajouter un attribut tabindex à chaque élément
      photoImageBF.setAttribute("tabindex", index);
    });
  
  }
  const closeLightBox = document.createElement("i");
  closeLightBox.setAttribute("class", "fa-solid fa-xmark close-lightbox");
  sectionInnerLightBox.appendChild(closeLightBox);

  const arrowRight = document.createElement("i");
  arrowRight.setAttribute("class", "fa-solid fa-chevron-right arrow-right");
  sectionInnerLightBox.appendChild(arrowRight);

  const titleLightbox = document.createElement("span");
  titleLightbox.setAttribute("class","title-lightbox");
  titleLightbox.textContent = "blabla";
  sectionInnerLightBox.appendChild(titleLightbox);

  closeLightBox.addEventListener("click", function(){
    closLightbox();
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closLightbox();
    }
  });

  arrowRight.addEventListener("click", function() {
    // Obtenez l'index de la photo actuellement affichée
    let currentPhotoIndex = photographerPhotos.indexOf(photo);  
    // Calculez l'index de la photo suivante
    let nextPhotoIndex = (currentPhotoIndex + 1) % photographerPhotos.length;
    // Récupérez la prochaine photo et son titre
    let nextPhoto = photographerPhotos[nextPhotoIndex];
    // Mettez à jour la source de l'image et le titre de la lightbox avec la photo suivante
 if(nextPhoto.image){
  const photoImageBF = document.createElement("img");
  photoImageBF.setAttribute("class","img-big-format")
  photoImageBF.setAttribute("data-date",photo.date)
  photoImageBF.setAttribute("title",nextPhoto.title)
  photoImageBF.setAttribute("alt",nextPhoto.title)
  photoImageBF.src = `assets/photographers/${nextPhoto.image}`;
  sectionInnerLightBox.appendChild(photoImageBF);

  var mediaTab = document.querySelectorAll(".img-big-format");

  mediaTab.forEach(function(photoImageBF, index) {
    // Ajouter un attribut tabindex à chaque élément
    photoImageBF.setAttribute("tabindex", index);
  });

 }
 if(nextPhoto.video){
  const photoImageBF = document.createElement("img");
  photoImageBF.setAttribute("class","img-big-format")
  photoImageBF.setAttribute("data-date",photo.date)
  photoImageBF.setAttribute("title",photo.title)
  photoImageBF.setAttribute("alt",nextPhoto.title)
  photoImageBF.src = `assets/photographers/${photo.image}`;
  sectionInnerLightBox.appendChild(photoImageBF);

  var mediaTab = document.querySelectorAll(".img-big-format");

  mediaTab.forEach(function(photoImageBF, index) {
    // Ajouter un attribut tabindex à chaque élément
    photoImageBF.setAttribute("tabindex", index);
  });

 }
    // Mettez à jour la variable "photo" avec la prochaine photo
    photo = nextPhoto;
    if (nextPhoto == undefined){
      arrowRight.style.display = "none";
    }
  });

  arrowLeft.addEventListener("click", function() {
    // Obtenez l'index de la photo actuellement affichée
    let currentPhotoIndex = photographerPhotos.indexOf(photo);    
    // Calculez l'index de la photo précédente
    let previewPhotoIndex = (currentPhotoIndex - 1 + photographerPhotos.length) % photographerPhotos.length;
    // Récupérez la photo précédente et son titre
    let previewPhoto = photographerPhotos[previewPhotoIndex];
    // Mettez à jour la source de l'image et le titre de la lightbox avec la photo précédente
    imgBigFormat.setAttribute("src", `assets/photographers/${previewPhoto.image}`);
    // Mettez à jour la variable "photo" avec la photo précédente
    photo = previewPhoto;
    if (previewPhoto == undefined){
      arrowLeft.style.display = "none";
    } else {
      arrowRight.style.display = "block"; // Assurez-vous que la flèche droite est affichée si nécessaire
    }
  });
});



if(photo.image == undefined){
        const photoVideo = document.createElement("video");
        photoVideo.setAttribute("class","box-img")
        lightboxLink.appendChild(photoVideo);

        const photoVideoSource = document.createElement("source");
        photoVideoSource.src=`assets/photographers/${photo.video}`;
        photoVideoSource.type ="video/mp4";
      
        photoVideoSource.setAttribute("data-date",photo.date)
        photoVideoSource.setAttribute("title",photo.title)
        photoVideoSource.setAttribute("alt",photo.title)

        photoVideo.appendChild(photoVideoSource) 

        var mediaTab = document.querySelectorAll(".box-img");

        mediaTab.forEach(function(photoVideoSource, index) {
          // Ajouter un attribut tabindex à chaque élément
          photoVideoSource.setAttribute("tabindex", index);
        });
}

if (photo.video == undefined){
        const photoImage = document.createElement("img");
        photoImage.setAttribute("class","box-img")
        photoImage.setAttribute("data-date",photo.date)
        photoImage.setAttribute("title",photo.title)
        photoImage.setAttribute("alt",photo.title)
        photoImage.src = `assets/photographers/${photo.image}`;
        lightboxLink.appendChild(photoImage);

        var mediaTab = document.querySelectorAll(".box-img");

        mediaTab.forEach(function(photoImage, index) {
          // Ajouter un attribut tabindex à chaque élément
          photoImage.setAttribute("tabindex", index);
        });
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
numberLikes.setAttribute("class","number-likes")
numberLikes.textContent = `${photo.likes}`;
photoLikes.appendChild(numberLikes);
   
const iconLikes = document.createElement("i")
iconLikes.setAttribute("class","fa-regular fa-heart heart-like")
iconLikes.setAttribute("aria-label","En cliquand une fois cela ajoute un like, recliquant une fois cele annule le like")
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
iconLikesValue.setAttribute("class","fa-solid fa-heart affichage-totallikes")
likeSectionPrice.appendChild(iconLikesValue)

const priceVue = document.createElement("span")
priceVue.textContent = photographer.price + "€ / jour";
sectionTotalPrice.appendChild(priceVue)

totalLikes += photo.likes;
function updateTotalLikes() {
  let likeValueElements = document.querySelectorAll(".like-value-section-price");
  likeValueElements.forEach(function(element) {
    element.textContent = totalLikes;
  });
 }
  updateTotalLikes()
iconLikes.addEventListener("click", function() {
  if (!iconLikes.classList.contains("fa-solid")) {
    iconLikes.classList.remove("fa-regular");
    iconLikes.classList.add("fa-solid");
    photo.likes++;
    totalLikes++;
  } else {
    iconLikes.classList.remove("fa-solid");
    iconLikes.classList.add("fa-regular");
    photo.likes--;
    totalLikes--;
  }
  numberLikes.textContent = photo.likes;
  console.log(totalLikes);
  updateTotalLikes();
});
updateTotalLikes();
});    
      } else {
        console.error(`Le photographe avec l'identifiant '${id}' n'a pas été trouvé.`);
      }
    }
    displayPhotographerInfo();