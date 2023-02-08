document.addEventListener("DOMContentLoaded", () => {
    let positionInput = document.getElementById("positionInput");
    let employerInput = document.getElementById("employerInput");
    let positionDescription = document.getElementById("positionDescription");

    positionInput.addEventListener("input", positionInputValidation);
    employerInput.addEventListener("input", employerInputValidation);
    positionDescription.addEventListener("input", positionDescriptionValidation);
    document.getElementById("addExperience").addEventListener("click", addExperienceForm);
    let next = document.getElementById("toEducationButton");
    next.addEventListener("click", preventEducationNav);
})

function preventEducationNav(e) {
    let positionInput = document.getElementById("positionInput");
    let positionVal = JSON.parse(localStorage.getItem("positionVal"));
    if (!positionVal) {
        e.preventDefault();
        positionInput.classList.add("is-invalid");
    }
    let employerInput = document.getElementById("employer");
    let employerVal = JSON.parse(localStorage.getItem("employerVal"));
    if (!employerVal) {
        e.preventDefault();
        employerInput.classList.add("is-invalid");
    }
    let startTimeInput = document.getElementById("startDate");
    let startTimeVal = localStorage.getItem("startDateValidation");
    if (!startTimeVal) {
        e.preventDefault();
        startTimeInput.style.borderColor = "#F93B1D"
        startTimeInput.style.outlineColor = "#F93B1D"
    }
    let endTimeInput = document.getElementById("endDate");
    let entTimeVal = localStorage.getItem("endDateValidation");
    if (!entTimeVal) {
        e.preventDefault();
        endTimeInput.style.borderColor = "#F93B1D"
        endTimeInput.style.outlineColor = "#F93B1D"
    }
    let positionDesInput = document.getElementById("positionDescription");
    let positionDesVal = JSON.parse(localStorage.getItem("positionDescriptoinResult"));
    if (!positionDesVal) {
        e.preventDefault();
        positionDesInput.style.borderColor = "#F93B1D"
        positionDesInput.style.outlineColor = "#F93B1D"
    }
}


function positionDescriptionValidation(e) {
    checkInputs()
    let positionDescription = e.target.value;
    let resumePositionDescription = document.getElementById("resumePositionDescription");
    resumePositionDescription.style.display = "unset";
    resumePositionDescription.innerHTML = positionDescription;

    let result = false;
    if (positionDescription.trim().length > 0) {
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
    localStorage.setItem("positionVal", result);
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
    localStorage.setItem("employerVal", result);
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

function addExperienceForm() {
    const experienceDescription = document.getElementById("experienceDescription");

    // Create the position input
    const positionInput = document.createElement("input");
    positionInput.type = "text";
    positionInput.classList.add("form-control", "form-control-lg", "positionInput");
    positionInput.placeholder = "დეველოპერი, დიზაინერი, ა.შ.";
    positionInput.setAttribute("aria-label", "Position");

    // Create the label for the position input
    const positionLabel = document.createElement("label");
    positionLabel.htmlFor = "positionInput";
    positionLabel.classList.add("form-label");
    positionLabel.textContent = "თანამდებობა";

    // create help text
    const positionHelpText = document.createElement("div");
    positionHelpText.classList.add("form-text");
    positionHelpText.textContent = "მინიმუმ ორი სიმბოლო"

    // Create the div for the position input
    const positionDiv = document.createElement("div");
    positionDiv.classList.add("mb-4", "mt-4");
    positionDiv.appendChild(positionLabel);
    positionDiv.appendChild(positionInput);
    positionDiv.appendChild(positionHelpText);

    // Create the employer input
    const employerInput = document.createElement("input");
    employerInput.type = "text";
    employerInput.classList.add("form-control", "form-control-lg", "employerInput");
    employerInput.placeholder = "დამსაქმებელი";
    employerInput.setAttribute("aria-label", "Employer");

    // Create the label for the employer input
    const employerLabel = document.createElement("label");
    employerLabel.htmlFor = "employerInput";
    employerLabel.classList.add("form-label");
    employerLabel.textContent = "დამსაქმებელი";

    // create help text
    const employerHelpText = document.createElement("div");
    employerHelpText.classList.add("form-text");
    employerHelpText.textContent = "მინიმუმ ორი სიმბოლო"

    // Create the div for the employer input
    const employerDiv = document.createElement("div");
    employerDiv.classList.add("mb-4");
    employerDiv.appendChild(employerLabel);
    employerDiv.appendChild(employerInput);
    employerDiv.appendChild(employerHelpText)

    // Create the start date input
    const startDateInput = document.createElement("input");
    startDateInput.type = "text";
    startDateInput.classList.add("form-control", "form-control-lg", "startDate");
    startDateInput.placeholder = "mm / dd / yyyy";
    startDateInput.setAttribute("aria-label", "Start Date");

    // create col for the start date
    const startDateCol = document.createElement("div");
    startDateCol.classList.add("col")

    // Create the label for the start date input
    const startDateLabel = document.createElement("label");
    startDateLabel.htmlFor = "date";
    startDateLabel.classList.add("form-label");
    startDateLabel.textContent = "დაწყების რიცხვი";

    // Create the div for the start date input
    const startDateDiv = document.createElement("div");
    startDateDiv.classList.add("mb-4");
    startDateDiv.appendChild(startDateLabel);
    startDateDiv.appendChild(startDateInput);

    // create col for the end date
    const endDateCol = document.createElement("div");
    endDateCol.classList.add("col")

    const endDateInput = document.createElement("input");
    endDateInput.type = "text";
    endDateInput.classList.add("form-control", "form-control-lg", "date", "endDate");
    endDateInput.placeholder = "mm / dd / yyyy";

    const endDateLabel = document.createElement("label");
    endDateLabel.htmlFor = "date";
    endDateLabel.textContent = "დამთავრების რიცხვი";

    startDateCol.append(startDateLabel, startDateInput)
    endDateCol.append(endDateLabel, endDateInput);

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("row", "mb-4");
    dateDiv.append(startDateCol, endDateCol);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.htmlFor = "positionDescription";
    descriptionLabel.classList.add("form-label");
    descriptionLabel.textContent = "აღწერა";

    const descriptionInput = document.createElement("textarea");
    descriptionInput.classList.add("form-control", "form-control-lg", "positionDescription");
    descriptionInput.rows = 3;
    descriptionInput.placeholder = "როლი თანამდებობაზე და ზოგადი აღწერა";

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("mb-4");
    descriptionDiv.appendChild(descriptionLabel);
    descriptionDiv.appendChild(descriptionInput)

    const createdExperienceDiv = document.createElement("div");
    createdExperienceDiv.classList.add(`createdExperienceDiv-${generateRandomString()}`);
    createdExperienceDiv.append(positionDiv, employerDiv, dateDiv, descriptionDiv);

    experienceDescription.append(createdExperienceDiv);

    const key = `experienceDiv-${generateRandomString()}`;
    localStorage.setItem(key, createdExperienceDiv.outerHTML);
}

// Function to generate a random string
const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15);
};