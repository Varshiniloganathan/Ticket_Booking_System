//fetching movie details data from the json file 
const container = document.querySelector(".movie-display");
fetch('json/movies.json')
.then(response => response.json())
.then(data=>{
    data.forEach(movie=>{
       const card = document.createElement("div");
       card.classList.add("movie-card");
       card.innerHTML = 
       `<img class="movie-image" src="${movie.image}" alt="movie1">
            <div class="movie-description">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-genre">${movie.genre}</p>
                <p class="movie-language">${movie.language}</p>
                <button class="btn-book">Book Now</button>

            </div>`;
       container.appendChild(card);
    });
});
//handles logout
function handlelogout(e){
    e.preventDefault();
    localStorage.setItem('isLoggedIn',false);
    window.location.href = "login.html";
}
//
const logtag = document.getElementById("login");
const logstatus = localStorage.getItem('isLoggedIn');
if(logstatus){
    logtag.innerText = "Logout";
    logtag.href="#";
    logtag.addEventListener('click',handlelogout);
}
else {
    logtag.innerText = "Login";
    logtag.href = "login.html";
}

