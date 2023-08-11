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

// fonction qui va gérer l'envoie du fromulaire
// appellée par le onsubmit dans le html
function validate() {
    //DOM element
    const firstName = document.querySelector("#first");
    const lastName = document.querySelector("#last");
    const email = document.querySelector("#email");
    const birthdate = document.querySelector("#birthdate");
    const quantity = document.querySelector("#quantity");
    const locationRadios = document.querySelectorAll("input[name='location']");
    const checkBoxOne = document.querySelector("#checkbox1");

    //consition d'envoie

    if (!firstName.value && firstName.value.length < 2) {
        return false;
    }

    if (!lastName.value && lastName.value.length < 2) {
        return false;
    }

    //utilisation d'un regex afin d'avoir un email valide (qui contient @ . et un minimum de caractères avant et apres le dot)
    const validEmailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!email.value.match(validEmailRegex)) {
        return false;
    }

    // Ici nous validons que l'input contient un entier avec 1 ou 2 chiffres uniquement
    // Un input type number peut contenir les caractères suivants: + - e (notation scientifique)
    const validNumberRegex = /^\d{1,2}$/;
    if (!quantity.value.match(validNumberRegex)) {
        return false;
    }

    // nous transformons la nodelist des radio buttons en un array afin d'itérer dessus
    if (!Array.from(locationRadios).some(radio => radio.checked)) {
        return false;
    }

    //nous vérifions que la checkbox obligatoire est bien coché
    if (!checkBoxOne.checked) {
        return false;
    }

    return true;
}
