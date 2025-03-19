const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_+=";

function generatePassword() {
    let length = document.getElementById("length").value;
    let includeLowercase = document.getElementById("lowercase").checked;
    let includeUppercase = document.getElementById("uppercase").checked;
    let includeNumbers = document.getElementById("numbers").checked;
    let includeSymbols = document.getElementById("symbols").checked;
    let excludeDuplicates = document.getElementById("exclude-duplicates").checked;
    let includeSpaces = document.getElementById("spaces").checked;

    let charSet = "";
    if (includeLowercase) charSet += lowercase;
    if (includeUppercase) charSet += uppercase;
    if (includeNumbers) charSet += numbers;
    if (includeSymbols) charSet += symbols;
    if (includeSpaces) charSet += " ";

    if (charSet === "") {
        alert("Please select at least one character type!");
        return;
    }

    let password = "";
    while (password.length < length) {
        let randomChar = charSet[Math.floor(Math.random() * charSet.length)];
        if (excludeDuplicates && password.includes(randomChar)) continue;
        password += randomChar;
    }

    document.getElementById("password").value = password;
    checkPasswordStrength(password); // Call strength checker
}

function checkPasswordStrength(password) {
    let strengthBar = document.getElementById("strength-bar");
    let strengthText = document.getElementById("strength-text");

    let strength = 0;
    if (password.length >= 8) strength++; // Length Check
    if (password.length >= 12) strength++; // Longer Length Bonus
    if (/[a-z]/.test(password)) strength++; // Lowercase
    if (/[A-Z]/.test(password)) strength++; // Uppercase
    if (/[0-9]/.test(password)) strength++; // Numbers
    if (/[\W]/.test(password)) strength++; // Symbols

    // Set bar width & color
    let strengthPercent = (strength / 6) * 100;
    strengthBar.style.width = strengthPercent + "%";

    // Change color based on strength
    if (strength <= 2) {
        strengthBar.style.background = "red";
        strengthText.textContent = "Strength: Weak";
    } else if (strength <= 4) {
        strengthBar.style.background = "orange";
        strengthText.textContent = "Strength: Medium";
    } else {
        strengthBar.style.background = "green";
        strengthText.textContent = "Strength: Strong";
    }
}

function updateLengthLabel() {
    document.getElementById("length-label").textContent = document.getElementById("length").value;
}

function copyPassword() {
    const passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
}

// Attach event listener
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("generate").addEventListener("click", generatePassword);
});
