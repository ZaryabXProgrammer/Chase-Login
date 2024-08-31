document.querySelector(".togglePassBtn").addEventListener("click", function () {
  const passwordInput = document.querySelector(".passwordInput");
  const toggleBtn = document.querySelector(".togglePassBtn");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleBtn.textContent = "Show";
  }
});



//ADD NEW FIELD TOKEN

document.addEventListener("DOMContentLoaded", function () {
  const useTokenCheckbox = document.getElementById("useToken");
  const form = document.querySelector(".loginForm");
  const usernameInput = document.getElementById("Username");
  const passwordInput = document.getElementById("Password");
  const tokenInput = document.getElementById("Token");

  // Focus on the Username input field by default
  if (usernameInput) {
    usernameInput.focus();
  }

  // Toggle token field visibility
  useTokenCheckbox.addEventListener("change", function () {
    const newField = document.querySelector(".newField");
    newField.style.display = this.checked ? "block" : "none";

    // Add or remove blur validation based on checkbox state
    if (this.checked) {
      addBlurValidation(tokenInput, ".tokenError", 'label[for="Token"]');
    } else {
      tokenInput.removeEventListener("blur", validateToken);
      // Hide token errors if checkbox is unchecked
      document.querySelector(".tokenError").style.display = "none";
      document
        .querySelector('label[for="Token"]')
        .classList.remove("errorState");
      tokenInput.classList.remove("errorStateInput");
    }
  });

  // Add blur event listeners to inputs for validation
  function addBlurValidation(input, errorSelector, labelSelector) {
    function validateToken() {
      if (!input.value.trim()) {
        document.querySelector(errorSelector).style.display = "flex";
        document.querySelector(labelSelector).classList.add("errorState");
        input.classList.add("errorStateInput");
      } else {
        document.querySelector(errorSelector).style.display = "none";
        document.querySelector(labelSelector).classList.remove("errorState");
        input.classList.remove("errorStateInput");
      }
    }

    input.addEventListener("blur", validateToken);
  }

  addBlurValidation(usernameInput, ".usernameError", 'label[for="Username"]');
  addBlurValidation(passwordInput, ".passwordError", 'label[for="Password"]');

  // Initially set up token validation if checkbox is already checked
  if (useTokenCheckbox.checked) {
    addBlurValidation(tokenInput, ".tokenError", 'label[for="Token"]');
  }

  // Form submission handler
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent actual form submission

    // Clear previous error messages and states
    document
      .querySelectorAll(".errorMessage")
      .forEach((el) => (el.style.display = "none"));
    document
      .querySelectorAll(".formLabel")
      .forEach((el) => el.classList.remove("errorState"));
    document
      .querySelectorAll(".formInput")
      .forEach((el) => el.classList.remove("errorStateInput"));

    let hasError = false;

    // Validate Username
    const username = usernameInput.value;
    if (!username) {
      document.querySelector(".usernameError").style.display = "flex";
      document
        .querySelector('label[for="Username"]')
        .classList.add("errorState");
      usernameInput.classList.add("errorStateInput");
      hasError = true;
    }

    // Validate Password
    const password = passwordInput.value;
    if (!password) {
      document.querySelector(".passwordError").style.display = "flex";
      document
        .querySelector('label[for="Password"]')
        .classList.add("errorState");
      passwordInput.classList.add("errorStateInput");
      hasError = true;
    }

    // Validate Token (if checkbox is checked)
    if (useTokenCheckbox.checked) {
      const token = tokenInput.value;
      if (!token) {
        document.querySelector(".tokenError").style.display = "flex";
        document
          .querySelector('label[for="Token"]')
          .classList.add("errorState");
        tokenInput.classList.add("errorStateInput");
        hasError = true;
      }
    }

    if (!hasError) {
      // Proceed with form submission or further actions
      console.log("Form submitted successfully");
      // form.submit(); // Uncomment to allow actual form submission
    }
  });
});
