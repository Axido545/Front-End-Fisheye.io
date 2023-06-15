function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


const validFirstMsg = document.querySelector('.validator-first');
const validLastMsg = document.querySelector('.validator-last');
const validEmailMsg = document.querySelector('.validator-email');

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



    document.addEventListener('DOMContentLoaded', function() {

        myForm.addEventListener('submit', function(event) {
          event.preventDefault();
          let isValid = false;
          if ( checkPrenom() 
          && checkEmail()
          && checkNom()) {
            isValid = true;
            console.log("le message a été bien reçu")
          } else {
            // Afficher un message d'erreur si nécessaire
     

          if (checkPrenom() == false){
            validFirstMsg.innerHTML = "Veuillez entrer un prénom";
            form.first.style.borderColor ="red";
          }
          if (checkNom() == false){
            validLastMsg.innerHTML = "Veuillez entrer un nom";
            form.last.style.borderColor ="red";
          }
          if (checkEmail()== false){
            validEmailMsg.innerHTML = "Veuillez entrer un e-mail";
            form.email.style.borderColor ="red";
      
          }

          }
        })})