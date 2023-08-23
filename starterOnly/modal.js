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
    heroSection.style.display = "none";
    topNav.style.display = "none";
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

//Prénom
const validatedFirstname = () => {
    //Dès que l'input n'est plus en focus le message d'erreur et le contour rouge disparait.
    firstName.onblur = () => {
        formData[0].dataset.errorVisible = false;
        formData[0].dataset.error = "";
    };
    if (!firstName.value || firstName.value.length < 2) {
        formData[0].dataset.errorVisible = true;
        formData[0].dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
        return false;
    } else {
        return true;
    }
};

//Nom
const validatedLastname = () => {
    lastName.onblur = () => {
        formData[1].dataset.errorVisible = false;
        formData[1].dataset.error = "";
    };

    if (!lastName.value || lastName.value.length < 2) {
        formData[1].dataset.errorVisible = true;
        formData[1].dataset.error = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        return false;
    } else {
        return true;
    }
};

//Email
const validatedMail = () => {
    email.onblur = () => {
        formData[2].dataset.errorVisible = false;
        formData[2].dataset.error = "";
    };
    //utilisation d'un regex afin d'avoir un email valide (qui contient @ . et un minimum de caractères avant et apres le dot)
    const validEmailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!email.value.match(validEmailRegex)) {
        formData[2].dataset.errorVisible = true;
        formData[2].dataset.error = "L'adresse email n'est pas valide";
        return false;
    } else {
        return true;
    }
};

//date de naissance
const validatedBirthDate = () => {
    birthdate.onblur = () => {
        formData[3].dataset.errorVisible = false;
        formData[3].dataset.error = "";
    };
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
const validatedQuantity = () => {
    quantity.onblur = () => {
        formData[4].dataset.errorVisible = false;
        formData[4].dataset.error = "";
    };
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
const validatedLocationRadio = () => {
    // nous transformons la nodelist des radio buttons en un array afin d'itérer dessus
    if (!Array.from(locationRadios).some(radio => radio.checked)) {
        formData[5].dataset.errorVisible = true;
        formData[5].dataset.error = "Veuillez selectionner une ville";
        return false;
    } else {
        return true;
    }
    //else {
    //     formData[5].dataset.errorVisible = false;
    //     formData[5].dataset.error = "";
    //     return true;
    // }
};

//checkbox: nous vérifions que la checkbox obligatoire est bien coché
const validatedCheckboxOne = () => {
    // checkBoxOne.onblur = () => {
    //     formData[5].dataset.errorVisible = false;
    //     formData[5].dataset.error = "";
    // };
    if (!checkBoxOne.checked) {
        formData[6].dataset.errorVisible = true;
        formData[6].dataset.error = "Vous devez accepter les conditions d'utilisation";
        return false;
    } else {
        return true;
    }
};

// fonction qui va gérer la validation et l'envoie du fromulaire
function validate(e) {
    e.preventDefault();

    // consition d'envoie
    validatedFirstname();
    validatedLastname();
    validatedMail();
    validatedBirthDate();
    validatedQuantity();
    validatedLocationRadio();
    validatedCheckboxOne();

    if (
        validatedFirstname() &&
        validatedLastname() &&
        validatedMail() &&
        validatedBirthDate() &&
        validatedQuantity() &&
        validatedLocationRadio() &&
        validatedCheckboxOne()
    ) {
        btnSubmit.addEventListener("click", () => {
            closeModal();
            heroSection.style.display = "none";
            topNav.style.display = "none";
            footer.style.display = "none";
            congrats.style.display = "block";
        });
    }
}
