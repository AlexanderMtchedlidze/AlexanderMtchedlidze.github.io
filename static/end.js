$(document).ready(() => {
    getGeneralInfo();
    getExperienceInfo();
    getData();
})

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
}

function retrieveLastName() {
    let lastName = localStorage.getItem("resumeLastName");
}

function retrieveImage() {
    let base64Image = localStorage.getItem('base64Image');
}

function retrieveAboutMe() {
    let aboutMe = localStorage.getItem("resumeAboutMe");
}

function retrieveTel() {
    let tel = localStorage.getItem("resumeTel");
}

function retrieveEmail() {
    let email = localStorage.getItem("resumeEmail");
}
function retrievePosition() {
    let position = localStorage.getItem("position");
}

function retrieveEmployer() {
    let employer = localStorage.getItem("employer");
}

function retrieveStartDate() {
    let startDate = localStorage.getItem('startDate');
}

function retrieveEndDate() {
    let endDate = localStorage.getItem('endDate');
}

function retrievePositionDescription() {
    let positionDes = localStorage.getItem("positionDescription");
}

function retrieveCreatedExperience() {
    const createdExperienceKeys = Object.keys(localStorage).filter(key => key.startsWith("createdExperience-"))
    createdExperienceKeys.forEach(key => {
        const divString = localStorage.getItem(key);
    });
}

function getData() {
    retrieveSchool();
    retrieveDropdown();
    retrieveEducationEndTime();
    retrieveSchoolDescription();
    getExperienceKeys();
    retrieveCreatedEducation();
    getEducationKeys();
}

function retrieveSchool() {
    let school = localStorage.getItem("school");
}

function retrieveDropdown() {
    let dropdown = localStorage.getItem("dropdown");
}

function retrieveEducationEndTime() {
    let endTime = localStorage.getItem("educationEndTime");
}

function retrieveSchoolDescription() {
    let description = localStorage.getItem("schoolDescription");
}

function getEducationKeys() {
    let items = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("newEducation")) {
            const value = localStorage.getItem(key);
            const experienceKey = key.split("_")[1];
            if (key.includes("School") && !key.includes("Validity")) {
                items.push
            }
            if (key.includes("Degree") && !key.includes("Validity")) {
                document.querySelector(`.dropdownInput_${experienceKey}`).innerHTML = value;
                document.querySelector(`.degreePlaceholder_${experienceKey}`).innerHTML = ", " + value;
            }
            if (key.includes("EndTime") && !key.includes("Validity")) {
                document.querySelector(`.endTime_${experienceKey}`).innerHTML = value;
                document.querySelector(`.endTimeInput_${experienceKey}`).value = value;
            } if (key.includes("Description") && !key.includes("Validity")) {
                document.querySelector(`.educationDescriptionInput_${experienceKey}`).value = value;
                document.querySelector(`.educationDescriptionPlaceholder_${experienceKey}`).innerHTML = value;
            }
        }
    }
}