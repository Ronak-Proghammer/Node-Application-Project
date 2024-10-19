document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    const firstName = document.getElementById("first_name").value.trim();
    const lastName = document.getElementById("last_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phone_number").value.trim();
    const city = document.getElementById("city").value.trim();
    const province = document.getElementById("province").value.trim();
    const postalCode = document.getElementById("postal_code").value.trim();
    const feedbackMessage = document
      .getElementById("feedback_message")
      .value.trim();

    // Clear previous error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((error) => error.remove());

    let isValid = true;

    if (firstName === "") {
      showError("first_name", "First name is required");
      isValid = false;
    }
    if (lastName === "") {
      showError("last_name", "Last name is required");
      isValid = false;
    }
    if (email === "" || !validateEmail(email)) {
      showError("email", "A valid email address is required");
      isValid = false;
    }
    if (phoneNumber === "" || !validatePhoneNumber(phoneNumber)) {
      showError("phone_number", "A valid phone number is required");
      isValid = false;
    }
    if (city === "") {
      showError("city", "City is required");
      isValid = false;
    }
    if (province === "") {
      showError("province", "Province is required");
      isValid = false;
    }
    if (postalCode === "") {
      showError("postal_code", "Postal code is required");
      isValid = false;
    }
    if (feedbackMessage === "") {
      showError("feedback_message", "Feedback message is required");
      isValid = false;
    }

    // Prevent form submission if validation fails
    if (!isValid) {
      e.preventDefault();
    }
  });

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const error = document.createElement("div");
  error.className = "error-message";
  error.style.color = "red";
  error.textContent = message;
  input.parentElement.appendChild(error);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(phoneNumber) {
  const re = /^\d{10,15}$/; // Adjust regex as per your need
  return re.test(String(phoneNumber));
}
