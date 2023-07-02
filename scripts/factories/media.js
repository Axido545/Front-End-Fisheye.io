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


    ////////////FILTRE

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
    
        const optionThree = document.createElement('option')
        optionThree.setAttribute("value","Titre");
        optionThree.textContent = "Titre";
        selectFiltre.appendChild(optionThree);


    ///////////FILTRE
    optionOne.addEventListener("click", function() {
      console.log("tri par popularité on récupère les éléments");
    
      // Sélectionnez tous les éléments avec la classe "photo-container"
      var mediaElements = document.querySelectorAll(".photo-container");
    
      // Convertissez les éléments en un tableau
      var mediaArray = Array.from(mediaElements);
    
      // Triez les éléments par popularité (numberLikes)
      mediaArray.sort(function(a, b) {
        var likesA = parseInt(a.querySelector(".number-likes").textContent);
        var likesB = parseInt(b.querySelector(".number-likes").textContent);
        return likesB - likesA;
      });
    
      // Réinsérez les éléments triés dans leur conteneur d'origine
      var mediaContainer = document.querySelector(".photo-gallery");
      mediaArray.forEach(function(media) {
        mediaContainer.appendChild(media);
      });
    
      // Forcez la mise à jour de l'affichage
      setTimeout(function() {
        window.dispatchEvent(new Event("resize"));
      }, 0);
    });
 

    optionTwo.addEventListener("click", function() {
      console.log("tri par date on récupère les éléments");
    
      // Sélectionnez tous les éléments avec la classe "photo-container"
      var mediaContainers = document.querySelectorAll(".photo-container");
    
      // Convertissez les éléments en un tableau
      var mediaArray = Array.from(mediaContainers);
    
      // Triez les éléments par date
      mediaArray.sort(function(a, b) {
        var dateA = new Date(a.querySelector("img, video").getAttribute("data-date"));
        var dateB = new Date(b.querySelector("img, video").getAttribute("data-date"));
        return dateA - dateB;
      });
    
      // Réinsérez les éléments triés dans leur conteneur d'origine
      var mediaGallery = document.querySelector(".photo-gallery");
      mediaArray.forEach(function(mediaContainer) {
        mediaGallery.appendChild(mediaContainer);
      });
    
      // Forcez la mise à jour de l'affichage
      setTimeout(function() {
        window.dispatchEvent(new Event("resize"));
      }, 0);
    });
    
    
    
    
    optionThree.addEventListener("click", function() {
      console.log("Tri par titre : on récupère les éléments");
    
      // Sélectionnez tous les éléments avec la classe "photo-container"
      var mediaContainers = document.querySelectorAll(".photo-container");
    
      // Convertissez les éléments en un tableau
      var mediaArray = Array.from(mediaContainers);
    
      // Triez les éléments par titre
      mediaArray.sort(function(a, b) {
        var titleA, titleB;
        var imgElementA = a.querySelector("img");
        var videoElementA = a.querySelector("video");
        if (imgElementA) {
          titleA = imgElementA.getAttribute("title");
        } else if (videoElementA) {
          var sourceElementA = videoElementA.querySelector("source");
          if (sourceElementA) {
            titleA = sourceElementA.getAttribute("title");
          }
        }
    
        var imgElementB = b.querySelector("img");
        var videoElementB = b.querySelector("video");
        if (imgElementB) {
          titleB = imgElementB.getAttribute("title");
        } else if (videoElementB) {
          var sourceElementB = videoElementB.querySelector("source");
          if (sourceElementB) {
            titleB = sourceElementB.getAttribute("title");
          }
        }
    
        return titleA.localeCompare(titleB);
      });
    
      // Réinsérez les éléments triés dans leur conteneur d'origine
      var mediaGallery = document.querySelector(".photo-gallery");
      mediaArray.forEach(function(mediaContainer) {
        mediaGallery.appendChild(mediaContainer);
      });
    
      // Forcez la mise à jour de l'affichage
      setTimeout(function() {
        window.dispatchEvent(new Event("resize"));
      }, 0);
    });
    


    const bgModalLightBox = document.createElement("section");
    bgModalLightBox.setAttribute("class", "bg-modal-lightbox")
    const bodyPage = document.querySelector("body");
    bodyPage.appendChild(bgModalLightBox)

    const imgBigFormat = document.createElement("img");
    imgBigFormat.setAttribute("class","img-big-format");
    bgModalLightBox.appendChild(imgBigFormat);

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
      photoContainer.appendChild(lightboxLink)





///////////////////////////LIGHTBOX/////////////////////////////////




lightboxLink.addEventListener("click", function(){
console.log("o")

bgModalLightBox.style.display ="block";

photographerPhotos.forEach((photo) => {
}

    )});
const lightboxPage = document.createElement("section")
lightboxPage
      if(photo.image == undefined){
        const photoVideo = document.createElement("video");
        photoVideo.setAttribute("class","box-img")

        photoContainer.appendChild(photoVideo);
        const photoVideoSource = document.createElement("source");
        photoVideoSource.src=`assets/photographers/${photo.video}`;
        photoVideoSource.type ="video/mp4";
      
        photoVideoSource.setAttribute("data-date",photo.date)
        photoVideoSource.setAttribute("title",photo.title)
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
        photoImage.src = `assets/photographers/${photo.image}`;
        photoContainer.appendChild(photoImage);

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
      
      const likeClick = document.createElement("span")
      likeClick.setAttribute("class", "like-section-value-price hiddenspan")
      photoLikes.appendChild(likeClick);


      const numberLikes = document.createElement("span");
      numberLikes.setAttribute("class","number-likes")
      numberLikes.textContent = `${photo.likes}`;
      photoLikes.appendChild(numberLikes);
   
      const iconLikes = document.createElement("i")
      iconLikes.setAttribute("class","fa-regular fa-heart heart-like")
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