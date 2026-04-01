//handles logout
const handlelogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = "login.html";
};
//change between login and logout button
const updateNavbar = () => {
    const logtag = document.getElementById("login");
    const logstatus = localStorage.getItem('isLoggedIn')==='true';
    if (logstatus) {
        logtag.innerText = "Logout";
        logtag.href = "#";
        logtag.addEventListener('click', handlelogout);
    }
    else {
        logtag.innerText = "Login";
        logtag.href = "login.html";
        logtag.removeEventListener('click', handlelogout); 
    }

}
document.addEventListener('DOMContentLoaded',updateNavbar);