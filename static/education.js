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
    getExperienceKeys();
    retrieveCreatedEducation();
    getEducationKeys();
    retrieveSchoolInputs();
    retrieveDegreeInputs();
    retrieveEndTimeInputs();
}

function retrieveCreatedEducation() {
    const educations = Object.keys(localStorage).filter(key => key.startsWith('educationDiv-'));
    const educationPanels = Object.keys(localStorage).filter(key => key.startsWith('educationPanelDiv-'));

    // Iterate over the keys and retrieve the div elements from local storage
    educations.forEach(key => {
        const divString = localStorage.getItem(key);
        const experienceDescription = document.getElementById("newEducationDescription");
        experienceDescription.innerHTML += divString;
    });

    educationPanels.forEach(key => {
        const divString = localStorage.getItem(key);
        const experienceDescription = document.getElementById("educationDescription");
        experienceDescription.innerHTML += divString;
    });
}

function retrieveEndTimeInputs() {
    document.querySelectorAll('input[class*="endTimeInput_"]').forEach(element => {
        let targetClass = Array.from(element.classList).find(function (className) {
            return className.startsWith("endTimeInput_");
        });
        let result = targetClass.slice("endTimeInput_".length);
        $(element).datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
        }).on('changeDate', function (selectedDate) {
            var formattedDate = selectedDate.date.getDate() + "/" + (selectedDate.date.getMonth() + 1) + "/" + selectedDate.date.getFullYear();
            document.querySelector(`.endTime_${result}`).innerHTML = formattedDate;
            localStorage.setItem(`newEducationEndTime_${result}`, formattedDate);
            localStorage.setItem(`newEducationEndTimeValidity_${result}`, true);
            $(this).css("outline", "0.5px solid #98E37E");
            $(this).css("border", "0.5px solid #98E37E");
        })
    })
}

function getEducationKeys() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("newEducation")) {
            const value = localStorage.getItem(key);
            const experienceKey = key.split("_")[1];
            if (key.includes("School") && !key.includes("Validity")) {
                document.querySelector(`.schoolInput_${experienceKey}`).value = value;
                document.querySelector(`.schoolPlaceholder_${experienceKey}`).innerHTML = value;
            }
            if (key.includes("Degree") && !key.includes("Validity")) {
                document.querySelector(`.dropdownInput_${experienceKey}`).innerHTML = value;
                document.querySelector(`.degreePlaceholder_${experienceKey}`).innerHTML = ", " + value;
            }
            if (key.includes("EndTime") && !key.includes("Validity")) {
                console.log(value)
                document.querySelector(`.endTime_${experienceKey}`).innerHTML = value;
                document.querySelector(`.endTimeInput_${experienceKey}`).value = value;
            }
        }
    }
}

function getExperienceKeys() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(key)
        if (key.startsWith("newExperience")) {
            const value = localStorage.getItem(key);
            const experienceKey = key.split("_")[1];
            if (key.includes("Position") && !key.includes("Validity")) {
                document.querySelector(`.positionPlaceholder_${experienceKey}`).innerHTML = value;
            } if (key.includes("Employer") && !key.includes("Validity")) {
                document.querySelector(`.employerPlaceholder_${experienceKey}`).innerHTML = ", " + value;
            } if (key.includes("Description") && !key.includes("Validity")) {
                document.querySelector(`.positionDescriptionPlaceholder_${experienceKey}`).innerHTML = value;
            } if (key.includes("StartDate") && !key.includes("Validity")) {
                document.querySelector(`.startTime_${experienceKey}`).innerHTML = value;
            } if (key.includes("EndDate") && !key.includes("Validity")) {
                document.querySelector(`.endTime_${experienceKey}`).innerHTML = value;
            }
        }
    }
}


function retrieveDegreeInputs() {
    document.querySelectorAll(`a[class*=dropdown-item_]`).forEach(element => {
        let targetClass = Array.from(element.classList).find(function (className) {
            return className.startsWith("dropdown-item_");
        });
        let result = targetClass.slice("dropdown-item_".length);
        element.addEventListener("click", e => {
            document.querySelector(`.dropdownInput_${result}`).innerHTML = e.target.innerHTML
            document.querySelector(`.degreePlaceholder_${result}`).innerHTML = ", " + e.target.innerHTML;
            localStorage.setItem(`newEducationDegree_${result}`, e.target.innerHTML);
            localStorage.setItem(`newEducationDegreeValidity_${result}`, true);
            removeValidationError(e);
        })
    })
}

function retrieveSchoolInputs() {
    document.querySelectorAll('input[class*="schoolInput_"]').forEach(element => {
        let targetClass = Array.from(element.classList).find(function (className) {
            return className.startsWith("schoolInput_");
        });
        let result = targetClass.slice("schoolInput_".length);
        element.addEventListener("input", (e) => {
            let value = e.target.value;
            document.querySelector(`.schoolPlaceholder_${result}`).innerHTML = value;
            localStorage.setItem(`newEducationSchool_${result}`, value);
            if (value.trim().length > 1) {
                localStorage.setItem(`newEducationSchoolValidity_${result}`, true);
                removeValidationError(e)
            } else {
                localStorage.setItem(`newEducationSchoolValidity_${result}`, false);
                addValidationError(e)
            }
        })
    })
}

function retrieveSchool() {
    let school = localStorage.getItem("school");
    document.getElementById("school").innerHTML = school;
    document.getElementById("schoolInput").value = school;
}

function retrieveDropdown() {
    let dropdown = localStorage.getItem("dropdown");
    document.getElementById("dropdownMenuButton").innerHTML = dropdown;
    if (dropdown) {
        document.getElementById("degree").innerHTML = ", " + dropdown;
    }
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
    resumeEmployer.innerHTML = ", " + employer;
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
    const createdExperienceKeys = Object.keys(localStorage).filter(key => key.startsWith("createdExperience-"))
    createdExperienceKeys.forEach(key => {
        const divString = localStorage.getItem(key);
        const experienceDescription = document.getElementById("createdExperience");
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
    const key = generateRandomString();
    const schoolContainer = document.createElement("div");
    schoolContainer.classList.add("mb-4", "mt-4");

    const schoolLabel = document.createElement("label");
    schoolLabel.setAttribute("for", "schoolInput");
    schoolLabel.classList.add("form-label");
    schoolLabel.innerHTML = "სასწავლებელი";
    schoolContainer.appendChild(schoolLabel);

    const schoolInput = document.createElement("input");
    schoolInput.setAttribute("type", "text");
    schoolInput.setAttribute("placeholder", "სასწავლებელი");
    schoolInput.setAttribute("aria-label", "School");
    schoolInput.classList.add("form-control", "form-control-lg", "schoolInput", `schoolInput_${key}`);
    schoolContainer.appendChild(schoolInput);

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
    dropdownButton.classList.add("btn", "btn-light", "dropdown-toggle", `dropdownInput_${key}`);
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
    dropdownItem1.classList.add("dropdown-item", `dropdown-item_${key}`);
    dropdownItem1.href = "#";
    dropdownItem1.textContent = "საშუალო სკოლის დიპლომი";

    const dropdownItem2 = document.createElement("a");
    dropdownItem2.classList.add("dropdown-item", `dropdown-item_${key}`);
    dropdownItem2.href = "#";
    dropdownItem2.textContent = "ზოგადსაგანმანათებლო დიპლომი";

    const dropdownItem3 = document.createElement("a");
    dropdownItem3.classList.add("dropdown-item", `dropdown-item_${key}`);
    dropdownItem3.href = "#";
    dropdownItem3.textContent = "ბაკალავრი";

    const dropdownItem4 = document.createElement("a");
    dropdownItem4.classList.add("dropdown-item", `dropdown-item_${key}`);
    dropdownItem4.href = "#";
    dropdownItem4.textContent = "მაგისტრატი";

    const dropdownItem5 = document.createElement("a");
    dropdownItem5.classList.add("dropdown-item", `dropdown-item_${key}`);
    dropdownItem5.href = "#";
    dropdownItem5.innerHTML = "დოქტორი";

    const dropdownItem6 = document.createElement("a");
    dropdownItem6.classList.add("dropdown-item", `dropdown-item_${key}`);
    dropdownItem6.href = "#";
    dropdownItem6.innerHTML = "ასოცირებული ხარისხი";

    const dropdownItem7 = document.createElement("a");
    dropdownItem7.classList.add("dropdown-item", `dropdown-item_${key}`);
    dropdownItem7.href = "#";
    dropdownItem7.innerHTML = "სტუდენტი";

    const dropdownItem8 = document.createElement("a");
    dropdownItem8.classList.add("dropdown-item", `dropdown-item_${key}`);
    dropdownItem8.href = "#";
    dropdownItem8.innerHTML = "კოლეჯი (ხარისხის გარეშე)";

    const dropdownItem9 = document.createElement("a");
    dropdownItem9.classList.add("dropdown-item", `dropdown-item_${key}`);
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
    endTimeInput.setAttribute("class", `form-control date form-control-lg endDate endTimeInput_${key}`);
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
    educationDescriptionTextarea.classList.add("form-control", "form-control-lg", `educationDescriptionInput_${key}`);
    educationDescriptionTextarea.setAttribute("rows", "3");
    educationDescriptionTextarea.setAttribute("placeholder", "განათლების აღწერა");

    educationDescriptionDiv.appendChild(educationDescriptionLabel);
    educationDescriptionDiv.appendChild(educationDescriptionTextarea);

    mainContainer.appendChild(educationDescriptionDiv);

    const newEducationDescription = document.createElement('div');
    newEducationDescription.classList.add("light-top-border", `createdEducationDiv_${key}`);
    newEducationDescription.append(schoolContainer);
    newEducationDescription.append(mainContainer);
    newEducationDescription.appendChild(educationDescriptionDiv);

    // Append main container to the body of the page
    const newEducationWrapper = document.getElementById("newEducationDescription")
    newEducationWrapper.appendChild(newEducationDescription);

    localStorage.setItem(`newEducationSchoolValidity_${key}`, false)
    schoolInput.addEventListener("input", (e) => {
        let value = e.target.value;
        localStorage.setItem(`newEducationSchool_${key}`, value);
        document.querySelector(`.schoolPlaceholder_${key}`).innerHTML = value;
        if (value.trim() > 1) {
            removeValidationError(e);
            localStorage.setItem(`newEducationSchoolValidity_${key}`, true)
        } else {
            addValidationError(e);
        }
    })

    localStorage.setItem(`newEducationDegreeValidity_${key}`, false);
    document.querySelectorAll(`.dropdown-item_${key}`).forEach(element => {
        element.addEventListener("click", e => {
            document.querySelector(`.dropdownInput_${key}`).innerHTML = e.target.innerHTML
            document.querySelector(`.degreePlaceholder_${key}`).innerHTML = ", " + e.target.innerHTML;
            localStorage.setItem(`newEducationDegree_${key}`, e.target.innerHTML);
            localStorage.setItem(`newEducationDegreeValidity_${key}`, true);
            removeValidationError(e);
        })
    })

    localStorage.setItem(`newExperienceEndTimeValidity_${key}`, false);
    $(endTimeInput).datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
    }).on("changeDate", (selectedDate) => {
        var formattedDate = selectedDate.date.getDate() + "/" + (selectedDate.date.getMonth() + 1) + "/" + selectedDate.date.getFullYear();
        document.querySelector(`.endTime_${key}`).innerHTML = formattedDate;
        localStorage.setItem(`newEducationEndTime_${key}`, formattedDate);
        localStorage.setItem(`newEducationEndTimeValidity_${key}`, true);
        $(this).css("outline", "0.5px solid #98E37E");
        $(this).css("border", "0.5px solid #98E37E");
    })

    const divKey = `educationDiv-${key}`;
    localStorage.setItem(divKey, newEducationDescription.outerHTML);

    createNewEducationPanel(key);
}

function createNewEducationPanel(key) {
    const flex = document.createElement('div');
    flex.classList.add("d-flex");

    const school = document.createElement("div");
    school.classList.add(`schoolPlaceholder_${key}`);
    school.style.fontWeight = "bold";
    flex.appendChild(school)

    const degree = document.createElement("div");
    degree.classList.add(`degreePlaceholder_${key}`);
    flex.appendChild(degree);

    const educationEndTime = document.createElement("div");
    educationEndTime.classList.add("d-flex", "text-secondary", `endTime_${key}`);

    const educationDescription = document.createElement("div");
    educationDescription.classList.add("mt-2", `educationDescriptionPlaceholder_${key}`);

    const newEducationPanel = document.getElementById("createdEducation");
    newEducationPanel.append(flex);
    newEducationPanel.append(educationEndTime);
    newEducationPanel.append(educationDescription);
    const divKey = `educationPanelDiv-${key}`;
    localStorage.setItem(divKey, newEducationPanel.outerHTML);
}