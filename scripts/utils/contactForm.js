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
      // Utilisez les données du photographe pour afficher les informations nécessaires
const modalContactName = document.querySelector(".modal header h2");
modalContactName.innerHTML =`Contactez-moi<br>${photographer.name}`;
modalContactName.setAttribute("class","title-name-contact")

    } else {
      console.error(`Le photographe avec l'identifiant '${id}' n'a pas été trouvé.`);
    }
  } else {
    console.error("Aucun identifiant de photographe spécifié dans l'URL.");
  }
}
init();


const modal = document.getElementById("contact_modal");

function displayModal() {
	modal.style.display = "block";
}
function closeModal() {


    modal.style.display = "none";
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    modal.style.display = "none";
  }
});


const btnContact = document.querySelector(".contact_button")

document.querySelector('img[src="assets/icons/close.svg"]').removeAttribute("onclick");
document.querySelector('.contact_button').removeAttribute("onclick");

const close = document.querySelector('img[src="assets/icons/close.svg"]');

btnContact.addEventListener("click", function(){
  displayModal()
})

close.addEventListener("click", function(){
closeModal()
})

const formModal = document.querySelector("form");
formModal.setAttribute("name","contact-photograph");
formModal.setAttribute("action","photographer.html");
formModal.setAttribute("method","get");
formModal.setAttribute("id","form-content");

const divOld = document.querySelector("form div");
divOld.remove()
const btnSubmitOld = document.querySelector("form button");
btnSubmitOld.remove()

const divFirst = document.createElement("div")
divFirst.setAttribute("class","formData formLast")
formModal.appendChild(divFirst)

const labelFirst =  document.createElement("label");
labelFirst.setAttribute("for","first");
labelFirst.textContent = "Prénom";
divFirst.appendChild(labelFirst)

const inputFirst = document.createElement("input");
inputFirst.setAttribute("class","text-control")
inputFirst.setAttribute("id","first")
inputFirst.setAttribute("type","text")
inputFirst.setAttribute("name","first")
divFirst.appendChild(inputFirst)

const validFirstBalise = document.createElement("span")
validFirstBalise.setAttribute("class", "validator-first validator-custum");
divFirst.appendChild(validFirstBalise)


const divLast = document.createElement("div")
divLast.setAttribute("class","formData formLast")
formModal.appendChild(divLast)

const labelLast =  document.createElement("label");
labelLast.setAttribute("for","last");
labelLast.textContent = "Nom";
divLast.appendChild(labelLast)

const inputLast = document.createElement("input");
inputLast.setAttribute("class","text-control")
inputLast.setAttribute("id","last")
inputLast.setAttribute("type","text")
inputLast.setAttribute("name","last")
divLast.appendChild(inputLast)

const validLastBalise = document.createElement("span")
validLastBalise.setAttribute("class", "validator-last validator-custum");
divLast.appendChild(validLastBalise)

const divEmail = document.createElement("div")
divEmail.setAttribute("class","formData formEmail")
formModal.appendChild(divEmail)

const labelEmail =  document.createElement("label");
labelEmail.setAttribute("for","email");
labelEmail.textContent = "E-mail";
divEmail.appendChild(labelEmail)

const inputEmail = document.createElement("input");
inputEmail.setAttribute("class","text-control")
inputEmail.setAttribute("id","email")
inputEmail.setAttribute("type","email")
inputEmail.setAttribute("name","email")
divEmail.appendChild(inputEmail)

const validEmailBalise = document.createElement("span")
validEmailBalise.setAttribute("class", "validator-email validator-custum");
divEmail.appendChild(validEmailBalise)


const divMessage = document.createElement("div")
divMessage.setAttribute("class","formData formMessahe")
formModal.appendChild(divMessage)


const labelMessage =  document.createElement("label");
labelMessage.setAttribute("for","email");
labelMessage.textContent = "Message";
divMessage.appendChild(labelMessage)

const textareaMessage = document.createElement("textarea");
textareaMessage.setAttribute("class","text-control")
textareaMessage.setAttribute("id","message")
textareaMessage.setAttribute("name","message")
textareaMessage.setAttribute("rows","44")
textareaMessage.setAttribute("cols","116")
divMessage.appendChild(textareaMessage)

const validMessageBalise = document.createElement("span")
validMessageBalise.setAttribute("class", "validator-message validator-custum");
divMessage.appendChild(validMessageBalise)

const btnSubmit = document.createElement("button")
btnSubmit.classList.add('button-submit');
btnSubmit.setAttribute("id","submit")
btnSubmit.setAttribute("aria-label","Envoyer mes information")
btnSubmit.textContent ="Evoyer";
formModal.appendChild(btnSubmit)

const validFirstMsg = document.querySelector('.validator-first');
const validLastMsg = document.querySelector('.validator-last');
const validEmailMsg = document.querySelector('.validator-email');
const validMessageMsg = document.querySelector(".validator-message")
const form = document.querySelector("#form-content")
const regexFirstLast = new RegExp('^[\\p{L} -]{2,}$', 'iu');
const regexEmail = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
const myForm = document.forms.namedItem('contact-photograph');

form.first.addEventListener('change', function(){
    validFirst(this);
  });
  
  form.last.addEventListener('change', function(){
    validLast(this);
  });
  
  form.email.addEventListener('change', function(){
    validEmail(this);
  });

  form.message.addEventListener('change', function(){
    validMessage(this);
  });

  const validFirst = function (inputFirst){

    if (inputFirst.value =="") {
      validFirstMsg.innerHTML = "Veuillez entrer un prénom";
      form.first.style.borderColor ="red";
    } else if (inputFirst.value.length < 2){
      validFirstMsg.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
      form.first.style.borderColor ="red";
    }else if (regexFirstLast.test(inputFirst.value)){
      validFirstMsg.innerHTML = "";
      form.first.style.borderColor ="black";
    }else {
      validFirstMsg.innerHTML = "Veuillez entrer un prénom valide";
      form.first.style.borderColor ="red";    
    }
    }
    
    const validLast = function (inputLast){
      if (inputLast.value == "") {
        validLastMsg.innerHTML = "Veuillez entrer un nom";
        form.last.style.borderColor ="red";
      }
      else if (inputLast.value.length < 2){
        validLastMsg.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        form.last.style.borderColor ="red";
      }else if (regexFirstLast.test(inputLast.value)){
        validLastMsg.innerHTML = ""
        form.last.style.borderColor ="black";
      }else {
        validLastMsg.innerHTML = "Veuillez entrer un nom valide"
        form.last.style.borderColor ="red";
      }
    }
    
    const validEmail = function (inputEmail){
      if(inputEmail == ""){
        validEmailMsg.innerHTML = "Veuillez entrer un e-mail";
        form.email.style.borderColor ="red";
      } else if (regexEmail.test(inputEmail.value)){
        validEmailMsg.innerHTML = "";
        form.email.style.borderColor ="black";
      }else {
        validEmailMsg.innerHTML = "Veuillez entrer un e-mail valide";
        form.email.style.borderColor ="red";
      }
    }

const validMessage = function(inputMessage){
  if(inputMessage ==""){
    validMessageMsg.innerHTML = "Veuillez écrire un message";
    form.message.style.borderColor ="red";
  }
  
};

function checkPrenom() {
  if (form.first.value =="") {
    validFirstMsg.innerHTML = "Veuillez entrer un prénom"
    return false;
  } else if (form.first.value.length < 2){
    validFirstMsg.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    return false;
  }else if (regexFirstLast.test(form.first.value)){
    validFirstMsg.innerHTML = ""
    return true;
  }else {
    validFirstMsg.innerHTML = "Veuillez entrer un prénom valide"
    return false;
  }
}
function checkNom() {
  if (form.last.value == "") {
    validLastMsg.innerHTML = "Veuillez entrer un nom"
    return false;
  } else if (form.last.value.length < 2){
    validLastMsg.innerHTML = "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    return false;
  }else if (regexFirstLast.test(form.last.value)){
    validLastMsg.innerHTML = ""
    return true;
  }else {
    validLastMsg.innerHTML = "Veuillez entrer un nom valide"
    return false;
  }
}
function checkEmail() {
  if(form.email == ""){
    validEmailMsg.innerHTML = "Veuillez entrer un e-mail";
    return false;
  } else if (regexEmail.test(form.email.value)){
    validEmailMsg.innerHTML = "";
     return true;
  }else {
    validEmailMsg.innerHTML = "Veuillez entrer un e-mail valide";
    return false;
  }
}

function checkMessage(){
if(form.message == "") {
  validMessageMsg.innerHTML = "Veuillez écrire un message";
  return false; 
} else {
  return true;
}


}

document.addEventListener('DOMContentLoaded', function() {
  myForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = false;
    if (checkPrenom() && checkEmail() && checkNom() && checkMessage()) {
      isValid = true;
      console.log('Prénom :' + form.first.value);
      console.log('Nom :' + form.last.value);
      console.log('Email :' + form.email.value);
      console.log('Message :' + form.message.value);
      closeModal()
    } else {
      if (checkPrenom() == false) {
        validFirstMsg.innerHTML = "Veuillez entrer un prénom";
        form.first.style.borderColor = "red";
      }
      if (checkNom() == false) {
        validLastMsg.innerHTML = "Veuillez entrer un nom";
        form.last.style.borderColor = "red";
      }
      if (checkEmail() == false) {
        validEmailMsg.innerHTML = "Veuillez entrer un e-mail";
        form.email.style.borderColor = "red";
      }
      if (checkMessage() == false) {
        validMessageMsg.innerHTML = "Veuillez entrer un message";
        form.message.style.borderColor = "red";
      }
    }
  });
});


