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
const heroSection = document.querySelector(".hero-section");
const topNav = document.querySelector(".topnav");
const footer = document.querySelector("footer");

// event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);
closeCongrats.addEventListener("click", closeCongratsModal);
closeCongratsButton.addEventListener("click", closeCongratsModal);
form.addEventListener("submit", onSubmit);

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

// close modal inform inscription ok
function closeCongratsModal() {
    congrats.style.display = "none";
    heroSection.style.display = "grid";
    topNav.style.display = "block";
    footer.style.display = "block";
}

/**
 * validation of each input:
 * function to make appear error messages used by all input validations:
 * @param {boolean} validation
 * @param {string} fieldId
 * @param {string} messageOverride
 * @returns {boolean}
 */
const validateField = (validation, fieldId, messageOverride) => {
    const isValid = validation;

    let parentFormDataDiv;

    // if browser does not support:has (firefox is the last one whiche does not support it, but it is working on it)
    if (navigator.userAgent.includes("Firefox")) {
        parentFormDataDiv = document.querySelector(`#${fieldId}`).parentElement;
    } else {
        // for all aother browser:
        parentFormDataDiv = document.querySelector(`.formData:has(#${fieldId})`);
    }

    if (messageOverride) {
        parentFormDataDiv.dataset.error = messageOverride;
    }

    parentFormDataDiv.dataset.errorVisible = !isValid;

    return isValid;
};

// FisrtName validation
const validateFirstname = () => validateField(firstName.value && firstName.value.length >= 2, "first");

// LastName validation
const validateLastname = () => validateField(lastName.value && lastName.value.length >= 2, "last");

// Email validation
// Using a regex in prder to have a valid email
const validEmailRegex = /^[\w-\.]+@[\w-\.]+\.[\w-]+$/;

const validateMail = () => validateField(validEmailRegex.test(email.value), "email");

// birthdate validation
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

// Tournaments number validation
// Here we are validating that the input holds only an integer with 1 or 2 numbers only
// An input type number can hold different caracters like + - e (scientific notaion)
const validNumberRegex = /^\d{1,2}$/;

const validateQuantity = () => validateField(validNumberRegex.test(quantity.value), "quantity");

// Witch tournaments
// We transform the radio buttons nodelist into an array in order to iterate over it

const validateLocationRadio = () =>
    validateField(
        Array.from(locationRadios).some(radio => radio.checked),
        "location1"
    );

// Checkbox: we check if the requiered checkbox is checked
const validateCheckboxOne = () => validateField(checkBoxOne.checked, "checkbox1");

// We put a listener "blur" on each input in order to check if they are good in order to show or not the error message to the user
firstName.addEventListener("blur", validateFirstname);
lastName.addEventListener("blur", validateLastname);
email.addEventListener("blur", validateMail);
birthdate.addEventListener("blur", validateBirthDate);
quantity.addEventListener("blur", validateQuantity);

// Function that is going to check the validation and sumit the form.
function onSubmit(e) {
    e.preventDefault();

    // Before submit we call all validating functions for each input

    let formIsValid = validateFirstname();
    formIsValid &= validateLastname();
    formIsValid &= validateMail();
    formIsValid &= validateBirthDate();
    formIsValid &= validateQuantity();
    formIsValid &= validateLocationRadio();
    formIsValid &= validateCheckboxOne();

    // If all validating functions return true, then we submit the form and send the user to a validation message.
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
