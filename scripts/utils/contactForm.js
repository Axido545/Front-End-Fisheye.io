/*
La fonction displayModal est utilisée pour afficher une fenêtre modale sur la page.
Elle sélectionne l'élément HTML avec l'ID "contact_modal" à l'aide de document.getElementById.
Ensuite, elle modifie le style de cet élément en lui attribuant la valeur "block"
pour le faire apparaître à l'écran.
*/
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

/*
La fonction closeModal est utilisée pour fermer la fenêtre modale.
Elle sélectionne également l'élément HTML avec l'ID "contact_modal"
et modifie son style en lui attribuant la valeur "none".
Cela rend la fenêtre modale invisible et la cache à l'écran.
*/
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
/*
Ces deux fonctions sont utilisées généralement en conjonction
pour afficher et masquer une fenêtre modale dans une application web.
*/