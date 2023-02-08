$(document).ready(function () {
    $('#startDate').datepicker({
        format: "dd/mm/yyyy",
        autoclose: true
    }).on('changeDate', function (selectedDate) {
        var formattedDate = selectedDate.date.getDate() + "/" + (selectedDate.date.getMonth() + 1) + "/" + selectedDate.date.getFullYear();
        localStorage.setItem("startDate", formattedDate);
        localStorage.setItem("startDateValidation", true);
        document.getElementById("startTime").innerHTML = formattedDate;
        document.getElementById("startTime").style.display = "unset"
        document.getElementById("experienceTitle").style.display = "unset";
        $(this).css("outline", "0.5px solid #98E37E");
        $(this).css("border", "0.5px solid #98E37E");
        checkInputs();
    });

    $('#endDate').datepicker({
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
        checkInputs();
    });
});

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