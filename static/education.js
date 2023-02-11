$(document).ready(() => {
    let schoolInput = document.getElementById("schoolInput");
    schoolInput.addEventListener("input", schoolInputVal);
    let dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(element => element.addEventListener("click", updateDropdown))
    document.querySelectorAll(".endDate").forEach(element => endDateInteraction(element));
    let educationDescriptionInput = document.getElementById("educationDescriptionInput");
    educationDescriptionInput.addEventListener("input", schoolDescriptionVal);
    let addEducation = document.getElementById("addEducation");
    addEducation.addEventListener("click", addNewEducation);
    getGeneralInfo();
    getExperienceInfo();
    getData();
})

function getData() {
    retrieveSchool();
    retrieveDropdown();
    retrieveEducationEndTime();
    retrieveSchoolDescription();
}

function retrieveSchool() {
    let school = localStorage.getItem("school");
    document.getElementById("school").innerHTML = school;
    document.getElementById("schoolInput").value = school;
}

function retrieveDropdown() {
    let dropdown = localStorage.getItem("dropdown");
    document.getElementById("dropdownMenuButton").innerHTML = dropdown;
    document.getElementById("degree").innerHTML = ", " + dropdown;
}

function retrieveEducationEndTime() {
    let endTime = localStorage.getItem("educationEndTime");
    document.getElementById("educationEndTime").innerHTML = endTime;
    document.getElementById("endDate").value = endTime;
}

function retrieveSchoolDescription() {
    let description = localStorage.getItem("schoolDescription");
    document.getElementById("educationDescription").innerHTML = description;
    document.getElementById("educationDescriptionInput").value = description;
}

function updateDropdown(e) {
    let value = e.target.innerHTML;
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
        document.getElementById("educationEndTime").innerHTML = formattedDate;
        localStorage.setItem("educationEndTime", formattedDate);
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

// Function to generate a random string
const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15);
};

function addNewEducation() {
    const schoolContainer = document.createElement("div");
    schoolContainer.classList.add("mb-4", "mt-4");

    const label = document.createElement("label");
    label.setAttribute("for", "schoolInput");
    label.classList.add("form-label");
    label.innerHTML = "სასწავლებელი";
    schoolContainer.appendChild(label);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "სასწავლებელი");
    input.setAttribute("aria-label", "School");
    input.classList.add("form-control", "form-control-lg", "schoolInput");
    schoolContainer.appendChild(input);

    const formText = document.createElement("div");
    formText.classList.add("form-text");
    formText.innerHTML = "მინიმუმ ორი სიმბოლო";
    schoolContainer.appendChild(formText);

    // Create main container
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("d-flex", "mb-4", "justify-content-between", "me-2");

    // Create dropdown container
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropdown");
    dropdownContainer.style.marginTop = "35px";

    // Create dropdown button
    const dropdownButton = document.createElement("button");
    dropdownButton.classList.add("btn", "btn-light", "dropdown-toggle");
    dropdownButton.type = "button";
    dropdownButton.setAttribute("data-toggle", "dropdown");
    dropdownButton.setAttribute("aria-haspopup", "true");
    dropdownButton.setAttribute("aria-expanded", "false");
    dropdownButton.style.backgroundColor = "#ffff";
    dropdownButton.style.width = "320px";
    dropdownButton.style.height = "45px";
    dropdownButton.textContent = "აირჩიეთ ხარისხი";

    // Create dropdown menu
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuButton");

    // Create dropdown items
    const dropdownItem1 = document.createElement("a");
    dropdownItem1.classList.add("dropdown-item");
    dropdownItem1.href = "#";
    dropdownItem1.textContent = "საშუალო სკოლის დიპლომი";

    const dropdownItem2 = document.createElement("a");
    dropdownItem2.classList.add("dropdown-item");
    dropdownItem2.href = "#";
    dropdownItem2.textContent = "ზოგადსაგანმანათებლო დიპლომი";

    const dropdownItem3 = document.createElement("a");
    dropdownItem3.classList.add("dropdown-item");
    dropdownItem3.href = "#";
    dropdownItem3.textContent = "ბაკალავრი";

    const dropdownItem4 = document.createElement("a");
    dropdownItem4.classList.add("dropdown-item");
    dropdownItem4.href = "#";
    dropdownItem4.textContent = "მაგისტრატი";

    const dropdownItem5 = document.createElement("a");
    dropdownItem5.className = "dropdown-item";
    dropdownItem5.href = "#";
    dropdownItem5.innerHTML = "დოქტორი";

    const dropdownItem6 = document.createElement("a");
    dropdownItem6.className = "dropdown-item";
    dropdownItem6.href = "#";
    dropdownItem6.innerHTML = "ასოცირებული ხარისხი";

    const dropdownItem7 = document.createElement("a");
    dropdownItem7.className = "dropdown-item";
    dropdownItem7.href = "#";
    dropdownItem7.innerHTML = "სტუდენტი";

    const dropdownItem8 = document.createElement("a");
    dropdownItem8.className = "dropdown-item";
    dropdownItem8.href = "#";
    dropdownItem8.innerHTML = "კოლეჯი (ხარისხის გარეშე)";

    const dropdownItem9 = document.createElement("a");
    dropdownItem9.className = "dropdown-item";
    dropdownItem9.href = "#";
    dropdownItem9.innerHTML = "სხვა";

    dropdownMenu.appendChild(dropdownItem1);
    dropdownMenu.appendChild(dropdownItem2);
    dropdownMenu.appendChild(dropdownItem3);
    dropdownMenu.appendChild(dropdownItem4);
    dropdownMenu.appendChild(dropdownItem5);
    dropdownMenu.appendChild(dropdownItem6);
    dropdownMenu.appendChild(dropdownItem7);
    dropdownMenu.appendChild(dropdownItem8);
    dropdownMenu.appendChild(dropdownItem9);

    dropdownContainer.appendChild(dropdownButton);
    dropdownContainer.appendChild(dropdownMenu);

    // Append dropdown container to main container
    mainContainer.appendChild(dropdownContainer);

    const endTimeDiv = document.createElement("div");

    const endTimeLabel = document.createElement("label");
    endTimeLabel.setAttribute("for", "date");
    endTimeLabel.innerText = "დამთავრების რიცხვი";

    const endTimeInput = document.createElement("input");
    endTimeInput.setAttribute("type", "text");
    endTimeInput.setAttribute("class", "form-control date form-control-lg endDate");
    endTimeInput.setAttribute("id", "endDate");
    endTimeInput.setAttribute("placeholder", "mm / dd / yyyy");

    endTimeDiv.appendChild(endTimeLabel);
    endTimeDiv.appendChild(endTimeInput);

    mainContainer.appendChild(endTimeDiv);

    const educationDescriptionDiv = document.createElement("div");
    educationDescriptionDiv.classList.add("mb-4");

    const educationDescriptionLabel = document.createElement("label");
    educationDescriptionLabel.setAttribute("for", "educationDescriptionInput");
    educationDescriptionLabel.classList.add("form-label");
    educationDescriptionLabel.innerHTML = "აღწერა";

    const educationDescriptionTextarea = document.createElement("textarea");
    educationDescriptionTextarea.classList.add("form-control");
    educationDescriptionTextarea.classList.add("form-control-lg");
    educationDescriptionTextarea.setAttribute("rows", "3");
    educationDescriptionTextarea.setAttribute("placeholder", "განათლების აღწერა");

    educationDescriptionDiv.appendChild(educationDescriptionLabel);
    educationDescriptionDiv.appendChild(educationDescriptionTextarea);

    mainContainer.appendChild(educationDescriptionDiv);

    const newEducationDescription = document.createElement('div');
    newEducationDescription.classList.add("light-top-border");
    newEducationDescription.append(schoolContainer);
    newEducationDescription.append(mainContainer);
    newEducationDescription.appendChild(educationDescriptionDiv);

    // Append main container to the body of the page
    const newEducationWrapper = document.getElementById("newEducationDescription")
    newEducationWrapper.appendChild(newEducationDescription);
}
