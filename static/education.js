$(document).ready(() => {
    let dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(element => element.addEventListener("click", updateDropdown))
    document.querySelectorAll(".endDate").forEach(element => endDateInteraction(element));
    getGeneralInfo();
    getExperienceInfo();
})

function updateDropdown(e) {
    let dropdown = document.getElementById("dropdownMenuButton");
    dropdown.innerHTML = e.target.innerHTML;
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
        document.getElementById("endTime").innerHTML = formattedDate;
        localStorage.setItem("endDate", formattedDate);
        document.getElementById("experienceTitle").style.display = "unset";
        document.getElementById("endTime").style.display = "unset"
        localStorage.setItem("endDateValidation", true);
        $(this).css("outline", "0.5px solid #98E37E");
        $(this).css("border", "0.5px solid #98E37E");
    });
}