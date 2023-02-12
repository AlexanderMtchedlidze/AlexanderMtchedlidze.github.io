document.addEventListener("DOMContentLoaded", () => {
    const resume = getResumeData();
    console.log(resume)
    fetch("https://resume.redberryinternship.ge/api/cvs",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cv: resume
            })
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
        })
        .catch(error => {
            console.log(error)
        });
});

function getResumeData() {
    const resume = {
        name: localStorage.getItem("resumeFirstName"),
        surname: localStorage.getItem("resumeLastName"),
        email: localStorage.getItem("resumeEmail"),
        phone_number: localStorage.getItem("resumeTel"),
        experiences: getExperienceData(),
        educations: getEducationData(),
        image: localStorage.getItem("base64Image"),
        about_me: localStorage.getItem("resumeAboutMe"),
    };

    return resume;
}

function getExperienceData() {
    const experiences = [];

    const position = localStorage.getItem(`position`);
    const employer = localStorage.getItem(`employer`);
    const start_date = localStorage.getItem(`startDate`);
    const due_date = localStorage.getItem(`endDate`);
    const positionDescription = localStorage.getItem(`positionDescription`);

    experiences.push({
        position,
        employer,
        start_date,
        due_date,
        positionDescription,
    });

    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes("newExperience")) {
            const experienceKey = key.split("_")[1];
            if (!keys.includes(experienceKey)) {
                keys.push(experienceKey);
                const position = localStorage.getItem(`newExperiencePosition_${experienceKey}`);
                const employer = localStorage.getItem(`newExperienceEmployer_${experienceKey}`);
                const start_date = localStorage.getItem(`newExperienceStartDate_${experienceKey}`);
                const due_date = localStorage.getItem(`newExperienceEndDate_${experienceKey}`);
                const description = localStorage.getItem(`newExperienceDescription_${experienceKey}`);

                experiences.push({
                    position,
                    employer,
                    start_date,
                    due_date,
                    description,
                });
            }
        }
    }
    return experiences;
}

function getEducationData() {
    const educations = [];

    const institute = localStorage.getItem(`school`);
    const degree_idString = localStorage.getItem(`degree_id`);
    const degree_id = parseInt(degree_idString.split("-")[1]);
    const due_date = localStorage.getItem(`educationEndTime`);
    const description = localStorage.getItem(`schoolDescription`);

    educations.push({
        institute,
        degree_id,
        due_date,
        description,
    });

    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("newEducation")) {
            const educationKey = key.split("_")[1];
            if (!keys.includes(educationKey)) {
                keys.push(educationKey);
                const institute = localStorage.getItem(`newEducationSchool_${educationKey}`);
                const degree_idString = localStorage.getItem(`newEducationDegreeId_${educationKey}`);
                const degree_id = parseInt(degree_idString.split("-")[1]);
                const due_date = localStorage.getItem(`newEducationEndTime_${educationKey}`);
                const description = localStorage.getItem(`newEducationDescription_${educationKey}`);

                educations.push({
                    institute,
                    degree_id,
                    due_date,
                    description,
                });
            }
        }
    }

    return educations;
}