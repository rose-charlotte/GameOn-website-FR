// eslint-disable-next-line no-unused-vars
function editNav() {
    const myTopNav = document.getElementById("myTopnav");
    if (myTopNav.className === "topnav") {
        myTopNav.className += " responsive";
    } else {
        myTopNav.className = "topnav";
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

// event listeners
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);
closeCongrats.addEventListener("click", closeCongratsModal);
closeCongratsButton.addEventListener("click", closeCongratsModal);
form.addEventListener("submit", onSubmit);

// display the inscription form in a modal
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

// Function to display the main page
function displayMainPage() {
    heroSection.style.display = "grid";
    topNav.style.display = "block";
    footer.style.display = "block";
}

// close inscription form
function closeModal() {
    modalbg.style.display = "none";
    displayMainPage();
}

// close succesful inscription modal
function closeCongratsModal() {
    congrats.style.display = "none";
    displayMainPage();
}

// displays the inscription succesful modal
function displayCongratsModal() {
    if (window.screen.width < 800) {
        topNav.style.display = "block";
    } else {
        topNav.style.display = "none";
    }
    heroSection.style.display = "none";
    footer.style.display = "none";
    congrats.style.display = "block";
}

/**
 * Validation of each input:
 * function to show or hide error messages based on a condition.
 * it can also override the error message.
 * @param {boolean} isValid determines whether we should show or hide the error message.
 * @param {string} fieldId id of the field that is the target of this validation.
 * @param {string} [messageOverride] if defined, will replace the actual error message in HTML.
 * @returns {boolean}
 */
const validateField = (isValid, fieldId, messageOverride) => {
    let parentFormDataDiv;

    // if browser does not support :has css pseudo-class (firefox is the last one whiche does not support it, but the team is working on it)
    // this is dangerous if the HTML structure changes a bit (adding an element as the parent of the field)
    // https://connect.mozilla.org/t5/ideas/when-is-has-css-selector-going-to-be-fully-implemented-in/idi-p/23794
    // https://bugzilla.mozilla.org/show_bug.cgi?id=418039&_gl=1*3tdgmb*_ga*NzE3Mjk5NDQuMTY2MzA1Njk0Mg..*_ga_R3H4BDP5J2*MTY5MzQwOTU5NS4xLjAuMTY5MzQwOTU5NS4wLjAuMA..#c62
    // https://developer.mozilla.org/fr/docs/Web/CSS/:has
    if (navigator.userAgent.includes("Firefox")) {
        parentFormDataDiv = document.querySelector(`#${fieldId}`).parentElement;
    } else {
        // for all other browsers
        parentFormDataDiv = document.querySelector(`.formData:has(#${fieldId})`);
    }

    if (messageOverride) {
        parentFormDataDiv.dataset.error = messageOverride;
    }

    parentFormDataDiv.dataset.errorVisible = !isValid;

    return isValid;
};

// validate first name
const validateFirstname = () => validateField(firstName.value && firstName.value.length >= 2, "first");

// validate last name
const validateLastname = () => validateField(lastName.value && lastName.value.length >= 2, "last");

// validate email
// Using a regex in order to have a valid email
// 1. any alphanum or - or .
// 2. @
// 3. any alphanum or - or .
// 4. .
// 5. any alphanum or -
// eslint-disable-next-line no-useless-escape
const validEmailRegex = /^[\w-\.]+@[\w-\.]+\.[\w-]+$/;

const validateEmail = () => validateField(validEmailRegex.test(email.value), "email");

// validate birthdate
const validateBirthDate = () => {
    // get date of birth without time
    const dateOfBirth = new Date(birthdate.value);
    const dateOfBirthWithoutTime = new Date(dateOfBirth.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate());

    // get current date without time
    const now = new Date();
    const nowDateWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // substract previous values and compare the year with 1970 (start of epoch time)
    const age = new Date(nowDateWithoutTime - dateOfBirthWithoutTime);
    const ageInYears = age.getFullYear() - 1970;

    return (
        validateField(!Number.isNaN(ageInYears), "birthdate", "Veuillez entrer une date de naissance") &&
        validateField(ageInYears >= 16, "birthdate", "Vous êtes trop jeune")
    );
};

// validate number of tournaments
// Here we are validating that the input holds only an integer with 1 or 2 numbers only
// An input type number can hold different caracters like + - e (scientific notaion)
const validNumberRegex = /^\d{1,2}$/;

const validateQuantity = () => validateField(validNumberRegex.test(quantity.value), "quantity");

// validate the desired location for the next tournament
const validateLocationRadio = () =>
    validateField(
        // we transform the NodeList in locationRadios to an array so we can use the some method
        Array.from(locationRadios).some(radio => radio.checked),
        "location1"
    );

// validate that the user agreed to the terms of use
const validateCheckboxOne = () => validateField(checkBoxOne.checked, "checkbox1");

// Adding a blur listener allows for validation of the field when the user leaves it
firstName.addEventListener("blur", validateFirstname);
lastName.addEventListener("blur", validateLastname);
email.addEventListener("blur", validateEmail);
birthdate.addEventListener("blur", validateBirthDate);
quantity.addEventListener("blur", validateQuantity);

// function taking care of the form validation and submission
function onSubmit(e) {
    e.preventDefault();

    // Before submitting we call all validation functions for each input and store the boolean result in formIsValid
    // using this format (&=) allows to still run each function and thus display every error to the user in one go
    let formIsValid = validateFirstname();
    formIsValid &= validateLastname();
    formIsValid &= validateEmail();
    formIsValid &= validateBirthDate();
    formIsValid &= validateQuantity();
    formIsValid &= validateLocationRadio();
    formIsValid &= validateCheckboxOne();

    // If all validation functions return true, then we submit the form and display to the user a success message.
    if (formIsValid) {
        closeModal();
        displayCongratsModal();
    }
}
