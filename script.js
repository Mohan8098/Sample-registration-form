// Get form elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

// Get error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Function to validate name
function validateName() {
    const name = nameInput.value.trim();

    if (name === '') {
        nameInput.classList.add('error');
        nameError.textContent = 'Name field cannot be empty';
        nameError.classList.add('show');
        return false;
    } else {
        nameInput.classList.remove('error');
        nameError.classList.remove('show');
        return true;
    }
}

// Function to validate email
function validateEmail() {
    const email = emailInput.value.trim();
    // Simple email pattern - checks for @ and .
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        emailInput.classList.add('error');
        emailError.textContent = 'Email field cannot be empty';
        emailError.classList.add('show');
        return false;
    } else if (!emailPattern.test(email)) {
        emailInput.classList.add('error');
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        return false;
    } else {
        emailInput.classList.remove('error');
        emailError.classList.remove('show');
        return true;
    }
}

// Function to validate password
function validatePassword() {
    const password = passwordInput.value;

    if (password === '') {
        passwordInput.classList.add('error');
        passwordError.textContent = 'Password field cannot be empty';
        passwordError.classList.add('show');
        return false;
    } else if (password.length < 6) {
        passwordInput.classList.add('error');
        passwordError.textContent = 'Password must be at least 6 characters long';
        passwordError.classList.add('show');
        return false;
    } else {
        passwordInput.classList.remove('error');
        passwordError.classList.remove('show');
        return true;
    }
}

// Function to check if all fields are valid
function isFormValid() {
    return validateName() && validateEmail() && validatePassword();
}

// Track which fields have been touched
let nameTouched = false;
let emailTouched = false;
let passwordTouched = false;

// Add event listeners to validate on input
nameInput.addEventListener('input', () => {
    nameTouched = true;
    validateName();
    checkButtonState();
});

emailInput.addEventListener('input', () => {
    emailTouched = true;
    validateEmail();
    checkButtonState();
});

passwordInput.addEventListener('input', () => {
    passwordTouched = true;
    validatePassword();
    checkButtonState();
});

// Function to check if button should be enabled
function checkButtonState() {
    const nameValid = nameTouched ? validateName() : true;
    const emailValid = emailTouched ? validateEmail() : true;
    const passwordValid = passwordTouched ? validatePassword() : true;

    if (nameTouched && emailTouched && passwordTouched && nameValid && emailValid && passwordValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (isFormValid()) {
        alert('Registred successfully');
        successMessage.classList.add('show');

        // Show success and reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            nameInput.classList.remove('error');
            emailInput.classList.remove('error');
            passwordInput.classList.remove('error');
            successMessage.classList.remove('show');
            submitBtn.disabled = true;
        }, 2000);
    }
});

// Disable submit button initially
submitBtn.disabled = true;
