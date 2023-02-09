document.addEventListener("DOMContentLoaded", () => {
    window.onload = () => {
        retrieveFirstName();
        retrieveLastName();
        retrieveImage();
        retrieveAboutMe();
        retrieveTel();
        retrieveEmail();
        retrievePosition();
        retrieveEmployer();
        retrieveStartDate();
        retrieveEndDate();
        retrievePositionDescription();
        retrieveCreatedExperience();
        checkInputValidity();
    }
})

function retrieveCreatedExperience() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('experienceDiv-'));

    // Iterate over the keys and retrieve the div elements from local storage
    keys.forEach(key => {
        const divString = localStorage.getItem(key);
        const experienceDescription = document.getElementById("newExperienceDescription");
        experienceDescription.innerHTML += divString;
    });
}

function checkInputValidity() {
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value.trim().length > 0) {
            document.querySelector("#experience").classList.remove("light-bottom-border");
            break;
        }
    }
    document.querySelector("#experience").classList.add("light-bottom-border")
}


function retrieveFirstName() {
    let nameInput = document.getElementById("nameInput");
    let firstName = localStorage.getItem("resumeFirstName");
    let resumeFirstName = document.getElementById("resumeFirstName");
    if (nameInput) {
        nameInput.value = firstName;
    }
    resumeFirstName.innerHTML = firstName;
}

function retrieveLastName() {
    let lastNameInput = document.getElementById("lastNameInput");
    let lastName = localStorage.getItem("resumeLastName");
    let resumeLastName = document.getElementById("resumeLastName");
    if (lastNameInput) {
        lastNameInput.value = lastName;
    }
    resumeLastName.innerHTML = lastName;
}

function retrieveImage() {
    let base64Image = localStorage.getItem('base64Image');
    if (base64Image) {
        resumeImage = document.getElementById('resumeImage');
        resumeImage.style.display = "unset";
        resumeImage.src = base64Image
    }
}

function retrieveAboutMe() {
    let aboutMeInput = document.getElementById("aboutMeInput");
    let aboutMe = localStorage.getItem("resumeAboutMe");
    let resumeAboutMe = document.getElementById("resumeAboutMe");
    let resumeAboutMeTitle = document.getElementById("resumeAboutMeTitle");
    if (aboutMeInput) {
        aboutMeInput.value = aboutMe;
    }
    resumeAboutMe.innerHTML = aboutMe;
    if (aboutMe != null && aboutMe.trim().length > 0) {
        resumeAboutMeTitle.style.display = "unset"
    }
}

function retrieveTel() {
    let telInput = document.getElementById("telInput");
    let tel = localStorage.getItem("resumeTel");
    let resumeTel = document.getElementById("resumeTel");
    let telIcon = document.getElementById("telIcon");
    if (telInput) {
        telInput.value = tel;
    }
    resumeTel.innerHTML = tel;
    if (tel && tel.trim().length > 0) {
        telIcon.style.display = "block";
    }
}

function retrieveEmail() {
    let emailInput = document.getElementById("emailInput");
    let email = localStorage.getItem("resumeEmail");
    let resumeEmail = document.getElementById("resumeEmail");
    let envelopeIcon = document.getElementById("envelopeIcon");
    if (emailInput) {
        emailInput.value = email;
    }
    resumeEmail.innerHTML = email;
    if (email && email.trim().length > 0) {
        envelopeIcon.style.display = "block";
    }
}
function retrievePosition() {
    let positionInput = document.getElementById("positionInput");
    let position = localStorage.getItem("position");
    let resumePosition = document.getElementById("position");
    if (position) {
        positionInput.value = position;
    }
    resumePosition.innerHTML = position;
}

function retrieveEmployer() {
    let employerInput = document.getElementById("employerInput");
    let employer = localStorage.getItem("employer");
    let resumeEmployer = document.getElementById("employer");
    if (employer) {
        employerInput.value = employer;
    }
    resumeEmployer.innerHTML = employer;
}

function retrieveStartDate() {
    let startDate = localStorage.getItem('startDate');
    let startDateInput = document.getElementById("startDate")
    let resumeStartDate = document.getElementById("startTime")
    if (startDate) {
        startDateInput.value = startDate;
    }
    resumeStartDate.innerHTML = startDate;
}


function retrieveEndDate() {
    let endDate = localStorage.getItem('endDate');
    let endDateInput = document.getElementById("endDate")
    let resumeEndDate = document.getElementById("endTime")
    if (endDate) {
        endDateInput.value = endDate;
    }
    resumeEndDate.innerHTML = endDate;
}

function retrievePositionDescription() {
    let positionDes = localStorage.getItem("positionDescription");
    let positionInput = document.getElementById("positionDescription");
    let resumePositionDes = document.getElementById("resumePositionDescription");
    if (positionDes) {
        positionInput.value = positionDes;
    }
    resumePositionDes.innerHTML = positionDes;
}
