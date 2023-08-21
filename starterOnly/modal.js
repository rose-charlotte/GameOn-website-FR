function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const btnSubmit = document.querySelector(".btn-submit");
const form = document.querySelector("#form");

// launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// close modal form
function closeModal() {
    modalbg.style.display = "none";
}

// submit form
form.addEventListener("submit", validate);

// fonction qui va gérer l'envoie du fromulaire
function validate(e) {
    e.preventDefault();
    //DOM element
    const firstName = document.querySelector("#first");
    const lastName = document.querySelector("#last");
    const email = document.querySelector("#email");
    const birthdate = document.querySelector("#birthdate");
    const quantity = document.querySelector("#quantity");
    const locationRadios = document.querySelectorAll("input[name='location']");
    const checkBoxOne = document.querySelector("#checkbox1");
    const formData = document.querySelectorAll(".formData");

    // consition d'envoie
    if (!firstName.value || firstName.value.length < 2) {
        formData[0].dataset.errorVisible = true;
        formData[0].dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    }

    if (!lastName.value || lastName.value.length < 2) {
        formData[1].dataset.errorVisible = true;
        formData[1].dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    }

    //utilisation d'un regex afin d'avoir un email valide (qui contient @ . et un minimum de caractères avant et apres le dot)
    const validEmailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!email.value.match(validEmailRegex)) {
        formData[2].dataset.errorVisible = true;
        formData[2].dataset.error = "L'adresse email n'est pas valide";
    }

    // Validation de la date de naissance

    const dateOfBirth = new Date(birthdate.value);
    const now = new Date();
    const nowDateWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const age = new Date(nowDateWithoutTime - dateOfBirth);
    const ageInYears = age.getFullYear() - 1970;

    if (ageInYears < 16) {
        formData[3].dataset.errorVisible = true;
        formData[3].dataset.error = "Vous semblez trop jeune!";
    }
    if (!ageInYears) {
        formData[3].dataset.errorVisible = true;
        formData[3].dataset.error = "Veuillez entrer une date de naissance";
    }

    // Ici nous validons que l'input contient un entier avec 1 ou 2 chiffres uniquement
    // Un input type number peut contenir les caractères suivants: + - e (notation scientifique)
    const validNumberRegex = /^\d{1,2}$/;
    if (!quantity.value.match(validNumberRegex)) {
        formData[4].dataset.errorVisible = true;
        formData[4].dataset.error = "Veuillez entrer un nombre entre 0 et 99";
    }

    // nous transformons la nodelist des radio buttons en un array afin d'itérer dessus
    if (!Array.from(locationRadios).some(radio => radio.checked)) {
        formData[5].dataset.errorVisible = true;
        formData[5].dataset.error = "Veuillez selectionner une ville";
    }

    //nous vérifions que la checkbox obligatoire est bien coché
    if (!checkBoxOne.checked) {
        formData[6].dataset.errorVisible = true;
        formData[6].dataset.error = "Vous devez accepter les conditions d'utilisation";
    }
}
