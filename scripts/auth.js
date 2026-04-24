const logtag = document.getElementById("login");
const signup = document.getElementById("signup");
//handles logout
const handlelogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = "login.html";
};
//change between login and logout button
const updateNavbar = () => {
    
    const logstatus = localStorage.getItem('isLoggedIn')==='true';
    if (logstatus) {
        logtag.textContent = "Logout";
        logtag.href = "#";
        logtag.addEventListener('click', handlelogout);
    }
    else {
        logtag.textContent = "Sign in";
        logtag.href = "login.html";
        logtag.removeEventListener('click', handlelogout); 
    }

}
document.addEventListener('DOMContentLoaded',updateNavbar);