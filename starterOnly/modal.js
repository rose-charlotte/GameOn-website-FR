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
const form = document.querySelector(".form");
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

const validate = () => {
    console.log("je valide");
    btnSubmit.addEventListener("click", () => (modalbg.style.display = "none"));
};
//launch form event
form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();

    const firstName = document.querySelector("#first").value;
    const lastName = document.querySelector("#last").value;
    const email = document.querySelector("#email").value;
    const birthdate = document.querySelector("#birthdate").value;
    const quantity = document.querySelector("#quantity").value;
    console.log(firstName.length);

    if (firstName.length >= 3) {
        validate();
    }
}
