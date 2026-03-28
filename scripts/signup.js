const form = document.querySelector("form");
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const pwd = document.getElementById('pwd');
const confirmpwd = document.getElementById('confirmpwd');
const error = document.getElementById('error');
//Regular Expression for email validation
const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,}$/
//Regular Expression for password validation
const pwdRegExp = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,12}$/
//Email Validation
const isValidEmail = () => {
    if (!emailRegExp.test(email.value)) {
        error.textContent = "Enter a valid email address.";
        return false;
    }
    error.textContent = "";
    return true;
}
//Password Validation
const isValidPwd = () => {
    if (!pwdRegExp.test(pwd.value)) {
        error.textContent = "Enter a valid password";
        return false;
    }
    error.textContent = "";
    return true;

}
//Confirm password
const isConfirmPwd = () => {
    if (confirmpwd.value !== pwd.value) {
        error.textContent = "Password doesn't match.";
        return false;
    }
    error.textContent = "";
    return true;
}
//signup
const handlesignup = (event) => {
    event.preventDefault();
    if (!isValidEmail() || !isValidPwd() || !isConfirmPwd()) {
        error.textContent = "Enter all the details correctly."
        return;
    }
    if (localStorage.getItem(email.value)) {
        alert('User already exists.');
    }
    else {
        localStorage.setItem(email.value, pwd.value);
        alert("Account is created successfully!");
        window.location.href = 'login.html';
    }
}
email.addEventListener("input", isValidEmail);
pwd.addEventListener("input", isValidPwd);
confirmpwd.addEventListener("input", isConfirmPwd);
form.addEventListener("submit", handlesignup);
