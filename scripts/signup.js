const fname = document.getElementById('fname').value;
const lname = document.getElementById('lname').value;
const email = document.getElementById('email').value;
const pwd = document.getElementById('pwd').value;
const confirmPwd = document.getElementById('confirmpwd').value;
function validateSignUp(){
    if(!fname || !lname || !email || !pwd || !confirmPwd){
        alert("Enter all the required details.");
    }
}
function handlesignup(event) {
    event.preventDefault();
    if(localStorage.getItem(email)){
        alert('User already exists.');
    }
    else{
        localStorage.setItem(email,pwd);
        alert("Account is created successfully!");
        window.location.href='login.html';
    }
}