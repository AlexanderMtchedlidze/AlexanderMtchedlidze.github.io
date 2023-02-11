$(document).ready(() => {
    let schoolInput = document.getElementById("schoolInput");
    schoolInput.addEventListener("input", schoolInputVal);
    let dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(element => element.addEventListener("click", updateDropdown))
    document.querySelectorAll(".endDate").forEach(element => endDateInteraction(element));
    let schoolDescription = document.getElementById("schoolDescription");
    schoolDescription.addEventListener("input", schoolDescriptionVal);
    getGeneralInfo();
    getExperienceInfo();
})

function updateDropdown(e) {
    let value =  e.target.innerHTML;
    let dropdown = document.getElementById("dropdownMenuButton");
    dropdown.innerHTML = value;
    document.getElementById("degree").innerHTML = ", " + value;
    localStorage.setItem("dropdown", value);
    localStorage.setItem("dropdownVal", true);
}

function getGeneralInfo() {
    retrieveFirstName();
    retrieveLastName();
    retrieveImage();
    retrieveAboutMe();
    retrieveTel();
    retrieveEmail();
}

function getExperienceInfo() {
    retrievePosition();
    retrieveEmployer();
    retrieveStartDate();
    retrieveEndDate();
    retrievePositionDescription();
    retrieveCreatedExperience();
}

function retrieveFirstName() {
    let firstName = localStorage.getItem("resumeFirstName");
    let resumeFirstName = document.getElementById("resumeFirstName");
    resumeFirstName.innerHTML = firstName;
}

function retrieveLastName() {
    let lastName = localStorage.getItem("resumeLastName");
    let resumeLastName = document.getElementById("resumeLastName");
    resumeLastName.innerHTML = lastName;
}

function retrieveImage() {
    let base64Image = localStorage.getItem('base64Image');
    resumeImage = document.getElementById('resumeImage');
    resumeImage.style.display = "unset";
    resumeImage.src = base64Image
}

function retrieveAboutMe() {
    let aboutMe = localStorage.getItem("resumeAboutMe");
    let resumeAboutMe = document.getElementById("resumeAboutMe");
    let resumeAboutMeTitle = document.getElementById("resumeAboutMeTitle");
    resumeAboutMe.innerHTML = aboutMe;
    resumeAboutMeTitle.style.display = "unset"
}

function retrieveTel() {
    let tel = localStorage.getItem("resumeTel");
    let resumeTel = document.getElementById("resumeTel");
    let telIcon = document.getElementById("telIcon");
    resumeTel.innerHTML = tel;
    telIcon.style.display = "block";
}

function retrieveEmail() {
    let email = localStorage.getItem("resumeEmail");
    let resumeEmail = document.getElementById("resumeEmail");
    let envelopeIcon = document.getElementById("envelopeIcon");
    resumeEmail.innerHTML = email;
    envelopeIcon.style.display = "block";
}
function retrievePosition() {
    let position = localStorage.getItem("position");
    let resumePosition = document.getElementById("position");
    resumePosition.innerHTML = position;
}

function retrieveEmployer() {
    let employer = localStorage.getItem("employer");
    let resumeEmployer = document.getElementById("employer");
    resumeEmployer.innerHTML = employer;
}

function retrieveStartDate() {
    let startDate = localStorage.getItem('startDate');
    let resumeStartDate = document.getElementById("startTime")
    resumeStartDate.innerHTML = startDate;
}


function retrieveEndDate() {
    let endDate = localStorage.getItem('endDate');
    let resumeEndDate = document.getElementById("endTime")
    resumeEndDate.innerHTML = endDate;
}

function retrievePositionDescription() {
    let positionDes = localStorage.getItem("positionDescription");
    let resumePositionDes = document.getElementById("resumePositionDescription");
    resumePositionDes.innerHTML = positionDes;
}

function retrieveCreatedExperience() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('experienceDiv-'));
    const keys2 = Object.keys(localStorage).filter(key => key.startsWith("createdExperience-"))
    keys.forEach(key => {
        const divString = localStorage.getItem(key);
        const experienceDescription = document.getElementById("newExperienceDescription");
        experienceDescription.innerHTML += divString;
    });

    keys2.forEach(key => {
        const divString = localStorage.getItem(key);
        const experienceDescription = document.getElementById("experience");
        experienceDescription.innerHTML += divString;
    });
}

function endDateInteraction(element) {
    $(element).datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
    }).on('changeDate', function (selectedDate) {
        var formattedDate = selectedDate.date.getDate() + "/" + (selectedDate.date.getMonth() + 1) + "/" + selectedDate.date.getFullYear();
        console.log(document.getElementById("endTime    "))
        document.getElementById("educationEndTime").innerHTML = formattedDate;
        localStorage.setItem("educationEndtime", formattedDate);
        localStorage.setItem("educationEndTimeValidation", true);
        $(this).css("outline", "0.5px solid #98E37E");
        $(this).css("border", "0.5px solid #98E37E");
    });
}

function schoolDescriptionVal(e) {
    let description = e.target.value;
    localStorage.setItem("schoolDescription", description);
    localStorage.setItem("schoolDescriptionVal", false);
    document.getElementById("educationDescription").innerHTML = description;
    if (description.trim().length > 0) {
        removeValidationError(e);
        localStorage.setItem("schoolDescriptionVal", true);
    } else {
        addValidationError(e);
    }
}

function schoolInputVal(e) {
    let school = e.target.value;
    localStorage.setItem("school", school);
    localStorage.setItem("schoolVal", false);
    document.getElementById("school").innerHTML = school;
    if (school.trim().length > 1) {
        removeValidationError(e);
        localStorage.setItem("schoolVal", true);
    } else {
        addValidationError(e);
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