document.addEventListener("DOMContentLoaded", () => {
    let positionInput = document.getElementById("positionInput");
    let employerInput = document.getElementById("employerInput");
    let positionDescription = document.getElementById("positionDescription");

    positionInput.addEventListener("input", positionInputValidation);
    employerInput.addEventListener("input", employerInputValidation);
    positionDescription.addEventListener("input", positionDescriptionValidation);
})

function positionDescriptionValidation(e) {
    checkInputs()
    let positionDescription = e.target.value;
    let resumePositionDescription = document.getElementById("resumePositionDescription");
    resumePositionDescription.style.display = "unset";
    resumePositionDescription.innerHTML = positionDescription;
    
    let result = false;
    if (positionDescription.trim().length > 1) {
        result = true;
        document.getElementById("experienceTitle").style.display = "unset";
        e.target.style.outline = "0.5px solid #98E37E"
        e.target.style.border = "0.5px solid #98E37E"
    } else {
        e.target.style.outline = "0.5px solid #EF5050"
        e.target.style.border = "0.5px solid #EF5050"
    }

    localStorage.setItem("positionDescription", positionDescription);
    localStorage.setItem("positionDescriptoinResult", result);
}

function positionInputValidation(e) {
    checkInputs()
    let position = e.target.value;
    let resumePositon = document.getElementById("position");
    resumePositon.style.display = "unset";
    resumePositon.innerHTML = position;

    let result = inputValidation(e, position);
    localStorage.setItem("position", position);
    localStorage.setItem("positionResult", result);
}

function employerInputValidation(e) {
    checkInputs()
    let employer = e.target.value;
    let resumeEmployer = document.getElementById("employer");
    resumeEmployer.style.display = "unset";
    resumeEmployer.innerHTML = ", " + employer;

    let result = inputValidation(e, employer);
    localStorage.setItem("employer", employer)
    localStorage.setItem("employerResult", result);
}

function inputValidation(e, value) {
    if (value.trim().length > 1) {
        document.getElementById("experienceTitle").style.display = "unset";
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
    e.target.classList.add("is-valid");
    e.target.classList.remove("is-invalid");
}


function checkInputs() {
    let inputs = document.querySelectorAll("input");
    let positionDescription = document.getElementById("positionDescription");
    let isValid = true;
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value.trim().length > 0 || !positionDescription.value.trim().length > 0) {
            isValid = false;
            document.getElementById("experience").classList.remove("light-bottom-border");
            break;
        }
    }
    if (isValid) {
        document.getElementById("experience").classList.add("light-bottom-border");
    }
}