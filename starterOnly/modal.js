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
const validateLastname = () => {
    if (!lastName.value || lastName.value.length < 2) {
        formData[1].dataset.errorVisible = true;
        formData[1].dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";

        return false;
    }

    formData[1].dataset.errorVisible = false;
    formData[1].dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";

    return true;
};

//Email
const validateMail = () => {
    //utilisation d'un regex afin d'avoir un email valide (qui contient @ . et un minimum de caractères avant et apres le dot)
    const validEmailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!email.value.match(validEmailRegex)) {
        formData[2].dataset.errorVisible = true;
        formData[2].dataset.error = "L'adresse email n'est pas valide";
        return false;
    } else {
        formData[2].dataset.errorVisible = false;
        return true;
    }
};

//date de naissance
const validateBirthDate = () => {
    const dateOfBirth = new Date(birthdate.value);
    const dateOfBirthWithoutTime = new Date(dateOfBirth.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate());
    const now = new Date();
    const nowDateWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const age = new Date(nowDateWithoutTime - dateOfBirthWithoutTime);
    const ageInYears = age.getFullYear() - 1970;

    if (ageInYears < 16) {
        formData[3].dataset.errorVisible = true;
        formData[3].dataset.error = "Vous semblez trop jeune!";
        return false;
    }
    if (!ageInYears) {
        formData[3].dataset.errorVisible = true;
        formData[3].dataset.error = "Veuillez entrer une date de naissance";
        return false;
    }

    return true;
};

//nombre de tournois
const validateQuantity = () => {
    // Ici nous validons que l'input contient un entier avec 1 ou 2 chiffres uniquement
    // Un input type number peut contenir les caractères suivants: + - e (notation scientifique)
    const validNumberRegex = /^\d{1,2}$/;
    if (!quantity.value.match(validNumberRegex)) {
        formData[4].dataset.errorVisible = true;
        formData[4].dataset.error = "Veuillez entrer un nombre entre 0 et 99";
        return false;
    } else {
        return true;
    }
};

//quel tournois
const validateLocationRadio = () => {
    // nous transformons la nodelist des radio buttons en un array afin d'itérer dessus
    if (!Array.from(locationRadios).some(radio => radio.checked)) {
        formData[5].dataset.errorVisible = true;
        formData[5].dataset.error = "Veuillez selectionner une ville";
        return false;
    } else {
        formData[5].dataset.errorVisible = false;
        formData[5].dataset.error = "";
        return true;
    }
};

//checkbox: nous vérifions que la checkbox obligatoire est bien coché
const validateCheckboxOne = () => {
    if (!checkBoxOne.checked) {
        formData[6].dataset.errorVisible = true;
        formData[6].dataset.error = "Vous devez accepter les conditions d'utilisation";
        return false;
    } else {
        formData[6].dataset.errorVisible = false;
        formData[6].dataset.error = "";
        return true;
    }
};

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

firstName.addEventListener("blur", validateFirstname);
lastName.addEventListener("blur", validateLastname);
email.addEventListener("blur", validateMail);
birthdate.addEventListener("blur", validateBirthDate);
quantity.addEventListener("blur", validateQuantity);
