//fetching movie details from the json file 
const container = document.querySelector(".movie-display");
let movies = [];
fetch('json/movies.json')
    .then(response => response.json())
    .then(data => {
        movies = data.map(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");
            card.innerHTML =
                `<img class="movie-image" src="${movie.image}" alt="movie1">
            <div class="movie-description">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-genre">${movie.genre}</p>
                <p class="movie-language">${movie.language}</p>
                <button  class="btn-book" data-id = ${movie.id}>Book Now</button>
            </div>`;
            container.appendChild(card);
            return { ...movie, element: card };
        });
    });
//navigation to booknow page
container.addEventListener('click', (e) => {
    if (e.target.classList.contains("btn-book")) {
        const id = e.target.dataset.id;
        window.location.href = `booknow.html?id=${id}`;

    }
});

//search function by movie
const searchMovie = document.getElementById('movie');
searchMovie.addEventListener('input', (e) => {
    const mValue = e.target.value.toLowerCase();
    movies.forEach((movie) => {
        const isVisible = movie.title.toLowerCase().includes(mValue);
        movie.element.style.display = isVisible ? 'block' : 'none';
    });

});
//search function by genre
const searchGenre = document.getElementById('genre');
searchGenre.addEventListener('input', (e) => {
    const gValue = e.target.value.toLowerCase();
    movies.forEach((movie) => {
        const isVisible = movie.genre.toLowerCase().includes(gValue);
        movie.element.style.display = isVisible ? 'block' : 'none';
    });
});
//search function by language
const searchLang = document.getElementById('language');
searchLang.addEventListener('input', (e) => {
    const lValue = e.target.value.toLowerCase();
    movies.forEach((movie) => {
        const isVisible = movie.language.toLowerCase().includes(lValue);
        movie.element.style.display = isVisible ? 'block' : 'none'; 
    });
});