document.addEventListener("DOMContentLoaded", () => {
    let nameInput = document.getElementById("nameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    let fileInput = document.getElementById("formFile");
    let emailInput = document.getElementById("emailInput");
    let aboutMeInput = document.getElementById("aboutMeInput");
    let telInput = document.getElementById("telInput");
    let next = document.getElementById("toExperienceButton");
    nameInput.addEventListener("input", firstNameValidation);
    lastNameInput.addEventListener("input", lastNameValidation);
    fileInput.addEventListener("change", fileInputValidation);
    emailInput.addEventListener("input", emailValidation);
    telInput.addEventListener("input", telValidation);
    aboutMeInput.addEventListener("input", aboutMeValidation);
    next.addEventListener("click", preventExperienceNav);
})

function preventExperienceNav(e) {
    let nameInput = document.getElementById("nameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    let firstNameVal = JSON.parse(localStorage.getItem("firstNameValidation"));
    let lastNameVal = JSON.parse(localStorage.getItem("lastNameValidation"));
    let emailInput = document.getElementById("emailInput");
    let emailVal = JSON.parse(localStorage.getItem("resumeEmailValidation"));
    let telInput = document.getElementById("telInput");
    let telVal = JSON.parse(localStorage.getItem("resumeTelValidation"));
    let fileInput = document.getElementById("formFile");
    let fileValidation = JSON.parse(localStorage.getItem("imageValidation"));
    if (!firstNameVal) {
        e.preventDefault();
        nameInput.classList.add("is-invalid");
    }
    if (!lastNameVal) {
        e.preventDefault();
        lastNameInput.classList.add("is-invalid");
    }
    if (!emailVal) {
        e.preventDefault();
        emailInput.classList.add("is-invalid");
    }
    if (!telVal) {
        e.preventDefault();
        telInput.classList.add("is-invalid");
    }
    if (!fileValidation) {
        e.preventDefault();
        fileInput.classList.add("is-invalid");
    }
}

function firstNameValidation(e) {
    let text = e.target.value;
    let firstName = document.getElementById("resumeFirstName");

    let validationResult = nameValidation(text);

    firstName.innerHTML = text;

    inputValidation(e, validationResult);

    localStorage.setItem("resumeFirstName", text);
    localStorage.setItem("firstNameValidation", validationResult);
}

function lastNameValidation(e) {
    let text = e.target.value;

    let validationResult = nameValidation(text);

    let lastName = document.getElementById("resumeLastName");

    lastName.innerHTML = text;

    localStorage.setItem("lastNameValidation", validationResult);

    inputValidation(e, validationResult);

    localStorage.setItem("resumeLastName", text);
}

function nameValidation(text) {
    let language = isGeorgianLanguage(text);

    if (text.length > 1 && language) {
        return true;
    }
    return false;
}

function fileInputValidation(e) {
    let resumeImage = document.getElementById("resumeImage");
    let imageFile = e.target.files[0];
    let imageUrl = URL.createObjectURL(imageFile);
    resumeImage.style.display = "unset";
    resumeImage.src = imageUrl;

    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result;
        localStorage.setItem("base64Image", srcData);
    };
    fileReader.readAsDataURL(imageFile);
    removeValidationError(e);
    localStorage.setItem("imageValidation", true);
}

function emailValidation(e) {
    let email = e.target.value;
    let resumeEmail = document.getElementById("resumeEmail");
    resumeEmail.innerHTML = email;

    let validationResult = email.endsWith("@redberry.ge") && email.length > 12;
    let envelopeIcon = document.getElementById("envelopeIcon");
    inputValidation(e, validationResult);

    let lengthValidation = email.trim().length > 0;
    if (lengthValidation) {
        envelopeIcon.style.display = "unset";
    } else {
        envelopeIcon.style.display = "none";
    }
    localStorage.setItem("resumeEmailValidation", validationResult);
    localStorage.setItem("resumeEmail", email);
}

function aboutMeValidation(e) {
    let aboutMe = e.target.value
    let resumeAboutMe = document.getElementById("resumeAboutMe");
    resumeAboutMe.innerHTML = aboutMe;
    let resumeAboutMeTitle = document.getElementById("resumeAboutMeTitle");
    let lengthValidation = aboutMe.trim().length > 0;
    console.log(lengthValidation)
    localStorage.setItem("resumeAboutMe", aboutMe);
    if (lengthValidation) {
        resumeAboutMeTitle.style.display = "unset";
        removeValidationError(e);
    } else {
        resumeAboutMeTitle.style.display = "none";
        e.target.classList.remove("is-valid");
    }
}

function telValidation(e) {
    let tel = e.target.value;
    let resumeTel = document.getElementById("resumeTel");
    resumeTel.innerHTML = tel;

    let telIcon = document.getElementById("telIcon");
    let validationResult = isGeorgianMobileNumber(tel);
    inputValidation(e, validationResult);
    
    let lengthValidation = tel.trim().length > 0;
    if (lengthValidation) {
        telIcon.style.display = "block";
    } else {
        telIcon.style.display = "none";
    }

    localStorage.setItem("resumeTelValidation", lengthValidation);
    localStorage.setItem("resumeTel", tel);
}

function isGeorgianLanguage(text) {
    var sample = /^[ა-ჰ]+$/;
    if (sample.test(text)) {
        return true;
    }
    return false;
}

function isGeorgianMobileNumber(number) {
    var extracted = number.replace(/\D/g, '');
    if (extracted.length !== 12) return false;
    if (number.charAt(0) !== '+' || number.charAt(1) !== '9' ||
        number.charAt(2) !== '9' || number.charAt(3) !== '5') return false;

    return true;
}

function inputValidation(e, validationResult) {
    if (validationResult) {
        removeValidationError(e);
        return true;
    } else {
        addValidationError(e);
        return false;
    }
}

function addValidationError(e) {
    e.target.classList.remove("is-valid");
    e.target.classList.add("is-invalid");
}

function removeValidationError(e) {
    e.target.classList.remove("is-invalid");
    e.target.classList.add("is-valid");
}