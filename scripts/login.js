form = document.querySelector('form');
//login functionality
const handleLogIn = (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;
    if (localStorage.getItem(email) === password) {
        localStorage.setItem('isLoggedIn', 'true');
        alert('LoggedIn successfully');
        window.location.href = 'homepage.html';
    }
    else {
        alert('Invalid username or password.Try Again!');
    }
};
form.addEventListener("submit", handleLogIn);