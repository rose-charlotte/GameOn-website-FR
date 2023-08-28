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
const form = document.querySelector("#form");
const congrats = document.querySelector(".bground-congrats");
const closeCongrats = document.querySelector(".closeCongrats");
const closeCongratsButton = document.querySelector(".btn-close");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const locationRadios = document.querySelectorAll("input[name='location']");
const checkBoxOne = document.querySelector("#checkbox1");

const btnSubmit = document.querySelector(".btn-submit");

const heroSection = document.querySelector(".hero-section");
const topNav = document.querySelector(".topnav");
const footer = document.querySelector("footer");

// event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);
closeCongrats.addEventListener("click", closeCongratsModal);
closeCongratsButton.addEventListener("click", closeCongratsModal);
form.addEventListener("submit", validate);

// launch modal form
function launchModal() {
    if (window.screen.width < 800) {
        topNav.style.display = "block";
    } else {
        topNav.style.display = "none";
    }
    heroSection.style.display = "none";
    footer.style.display = "none";
    modalbg.style.display = "block";
}

// close modal form
function closeModal() {
    heroSection.style.display = "grid";
    topNav.style.display = "block";
    footer.style.display = "block";
    modalbg.style.display = "none";
}

//close modal inform inscription ok
function closeCongratsModal() {
    congrats.style.display = "none";
    heroSection.style.display = "grid";
    topNav.style.display = "block";
    footer.style.display = "block";
}

//validation de chaque input:
// fonction pour factoriser chaque validation d'input:
const validateField = (validation, fieldId, messageOverride) => {
    const isValid = validation;

    if (messageOverride) {
        document.querySelector(`.formData:has(#${fieldId})`).dataset.error = messageOverride;
    }

    document.querySelector(`.formData:has(#${fieldId})`).dataset.errorVisible = !isValid;
    return isValid;
};

//Prénom
const validateFirstname = () => validateField(firstName.value && firstName.value.length >= 2, "first");

//Nom
const validateLastname = () => validateField(lastName.value && lastName.value.length >= 2, "last");

//Email
const validateMail = () => {
    //utilisation d'un regex afin d'avoir un email valide (qui contient @ . et un minimum de caractères avant et apres le dot)
    const validEmailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    validateField(email.value.match(validEmailRegex), "email");
};

//date de naissance
const validateBirthDate = () => {
    const dateOfBirth = new Date(birthdate.value);
    const dateOfBirthWithoutTime = new Date(dateOfBirth.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate());
    const now = new Date();
    const nowDateWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const age = new Date(nowDateWithoutTime - dateOfBirthWithoutTime);
    const ageInYears = age.getFullYear() - 1970;

    return (
        validateField(!Number.isNaN(ageInYears), "birthdate", "Veuillez entrer une date de naissance") &&
        validateField(ageInYears >= 16, "birthdate", "Vous êtes trop jeune")
    );
};

//nombre de tournois
const validateQuantity = () => {
    // Ici nous validons que l'input contient un entier avec 1 ou 2 chiffres uniquement
    // Un input type number peut contenir les caractères suivants: + - e (notation scientifique)
    const validNumberRegex = /^\d{1,2}$/;
    validateField(quantity.value.match(validNumberRegex), "quantity");
};

//quel tournois
const validateLocationRadio = () => {
    // nous transformons la nodelist des radio buttons en un array afin d'itérer dessus
    const validLocation = Array.from(locationRadios).some(radio => radio.checked);

    validateField(validLocation, "location1");
};

//checkbox: nous vérifions que la checkbox obligatoire est bien coché
const validateCheckboxOne = () => {
    validateField(checkBoxOne.checked, "checkbox1");
};

// On accroche un listener "blur" sur les input qui permet de vérifier au fure et à mesure qu'ils sont valides afin d'afficher ou de cacher l'erreur pour l'utilisateur.
firstName.addEventListener("blur", validateFirstname);
lastName.addEventListener("blur", validateLastname);
email.addEventListener("blur", validateMail);
birthdate.addEventListener("blur", validateBirthDate);
quantity.addEventListener("blur", validateQuantity);

// fonction qui va gérer la validation et l'envoie du fromulaire
function validate(e) {
    e.preventDefault();

    // consition d'envoie: nous appellons chaque fonction qui valide les input
    let formIsValid = validateFirstname();
    formIsValid &= validateLastname();
    formIsValid &= validateMail();
    formIsValid &= validateBirthDate();
    formIsValid &= validateQuantity();
    formIsValid &= validateLocationRadio();
    formIsValid &= validateCheckboxOne();

    //si toute les fonctions de validation sont à true, alors on valide le formulaire et on renvoie vers le message de validation
    if (formIsValid) {
        closeModal();
        if (window.screen.width < 800) {
            topNav.style.display = "block";
        } else {
            topNav.style.display = "none";
        }
        heroSection.style.display = "none";
        footer.style.display = "none";
        congrats.style.display = "block";
    }
}
