const params = new URLSearchParams(window.location.search);
//displays the selected movie details 
const image = document.querySelector(".movie-image");
const title = document.querySelector(".movie-title");
const genre = document.querySelector(".movie-genre");
const language = document.querySelector(".movie-language");
const theatre = document.querySelector(".theatre");
const d = document.querySelector(".date");
const id = params.get("id");
let selectedMovie = null;
let selectedTheatre = null;
let selectedDate = null;
let selectedTime = null;
let screen = null;
fetch('json/movies.json')
    .then(response => response.json())
    .then(data => {
        movie = data.find(item => item.id === id);
        image.src = movie.image;
        selectedMovie = movie.title;
        
        title.textContent = movie.title;
        genre.textContent = movie.genre;
        language.textContent = movie.language;
        for (let i in movie.theatres) {
            const input = document.createElement("input");
            const label = document.createElement("label");
            input.type = "radio";
            input.id = movie.theatres[i];
            input.name = "theatre";
            label.className = "theatre-radio";
            label.htmlFor = movie.theatres[i];
            label.textContent = movie.theatres[i];
            theatre.appendChild(input);
            theatre.appendChild(label);

        }
        //display show date based on the theatre
        fetch('json/showTime.json').then(response => response.json()).then(data => {
            
            day = data.find(item => item.movie === movie.title);
            screen = day.screen;
            const dates = day.Date.flatMap(dateObj => Object.keys(dateObj));
            dates.forEach(date => {
                const input = document.createElement("input");
                const label = document.createElement("label");
                input.type = "radio";
                input.id = date;
                input.name = "date";
                label.className = "date-radio";
                label.htmlFor = date;
                label.textContent = date;
                d.appendChild(input);
                d.appendChild(label);

            })

        })

    });

theatre.addEventListener("click", (e) => {
    if (e.target.classList.contains("theatre-radio")) {
        selectedTheatre = e.target.textContent; // ✅ store it here

    }
});
//display show timing based on the theatre and date
const show = document.querySelector(".show-time");
d.addEventListener("click", (e) => {
    if (e.target.classList.contains("date-radio")) {
        selectedDate = e.target.textContent;
        fetch('json/showTime.json')
            .then(response => response.json())
            .then(data => {
                const showtime = data.find(item => item.theatre === selectedTheatre && item.movie === movie.title);
                const times = showtime.Date
                    .flatMap(dateObj => Object.entries(dateObj))
                    .find(([date]) => date === selectedDate)?.[1] ?? [];
                if (!showtime || !showtime.Date) return;
                show.innerHTML = "";
                const heading = document.createElement("h3");
                heading.textContent = "Show Timing";
                show.appendChild(heading);

                times.forEach(time => {
                    const input = document.createElement("input");
                    const label = document.createElement("label");
                    input.type = "radio";
                    input.id = time;
                    input.name = "time";
                    label.className = "time-radio";
                    label.htmlFor = time;
                    label.textContent = time;
                    show.appendChild(input);
                    show.appendChild(label);


                })


            });
    };

});
//track selected time
show.addEventListener("click", (e) => {
    if (e.target.classList.contains("time-radio")) {
        selectedTime = e.target.textContent;

    }
});
//navigate to seat selection page
const button = document.querySelector(".btn");
button.addEventListener('click', (e) => {
    if (e.target.classList.contains("btn-proceed")) {
        localStorage.setItem("title",selectedMovie);
        localStorage.setItem("theatre",selectedTheatre);
        localStorage.setItem("date",selectedDate);
        localStorage.setItem("time",selectedTime);
        localStorage.setItem("screen",screen);
        window.location.href = "seat.html";

    }
});
