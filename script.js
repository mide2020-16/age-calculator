document.getElementById("ageForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  // Get input values
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);

  // Validate inputs
  if (!isValidDate(day, month, year)) {
    if (isNaN(day) || day < 1 || day > 31)
      showError("dayError", "Invalid day!");
    if (isNaN(month) || month < 1 || month > 12)
      showError("monthError", "Invalid month!");
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear())
      showError("yearError", "Invalid year!");
  } else if (isFutureDate(day, month, year)) {
    showError("yearError", "Date cannot be in the future!");
  } else {
    const { years, months, days } = calculateAge(day, month, year);
    resetErrors();
    displayAge(years, months, days);
  }
});

function resetErrors() {
  document
    .querySelectorAll("input")
    .forEach((input) => input.classList.remove("error"));
  document
    .querySelectorAll(".error-message")
    .forEach((msg) => (msg.style.display = "none"));
}

function showError(elementId, message) {
  const input = document.getElementById(elementId.replace("Error", ""));
  input.style.borderColor = "var(--light-red)";
  document
    .querySelectorAll("label")
    .forEach((label) => (label.style.color = "red"));
  const errorMsg = document.getElementById(elementId);
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}

function isValidDate(day, month, year) {
  const inputDate = new Date(year, month - 1, day);
  return (
    inputDate.getFullYear() === year &&
    inputDate.getMonth() === month - 1 &&
    inputDate.getDate() === day
  );
}

function isFutureDate(day, month, year) {
  const today = new Date();
  const inputDate = new Date(year, month - 1, day);
  return inputDate > today;
}

function calculateAge(day, month, year) {
  const today = new Date();
  let ageYears = today.getFullYear() - year;
  let ageMonths = today.getMonth() - (month - 1);
  let ageDays = today.getDate() - day;

  // Adjust day and month if needed
  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  return { years: ageYears, months: ageMonths, days: ageDays };
}

function displayAge(years, months, days) {
  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
}
