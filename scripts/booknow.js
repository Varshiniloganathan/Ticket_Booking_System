const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
//displays the selected movie details 
const image = document.querySelector(".movie-image");
const title = document.querySelector(".movie-title");
const genre = document.querySelector(".movie-genre");
const language = document.querySelector(".movie-language");
const theatre = document.querySelector(".theatre");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const info = document.querySelector(".choice");
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
        movie.theatres.forEach(th => {
            const wrap = document.createElement("div");
            wrap.className = "wrapper";
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "theatre";
            input.id = th;
            input.value = th;
            const symbol = document.createElement("div");
            symbol.className = "symbol";
            const info = document.createElement("div");
            const name = document.createElement("div");
            name.className = "theatre-name";
            name.textContent = th;
            info.appendChild(name);
            wrap.appendChild(input);
            wrap.appendChild(symbol);
            wrap.appendChild(info);
            theatre.appendChild(wrap);
            wrap.addEventListener('click', () => {
                //clears already selected theatre once the user selects any other theatre
                document.querySelectorAll(".theatre .wrapper ").forEach(w => w.classList.remove("selected"));
                wrap.classList.add("selected");
                input.checked = true;
                selectedTheatre = th;
                renderDates(th);

            });
        });
    });

function renderDates() {
    const today = new Date();
    date.innerHTML = "";
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(today.getDate() + i);
        const dbox = document.createElement("div");
        dbox.className = "date-box";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "date";
        input.id = d;
        input.value = d;
        dbox.appendChild(input);
        dbox.innerHTML = `
        <div className="d-day">${days[d.getDay()]}</div>
        <div className="d-date">${d.getDate()}</div>
        <div className="d-month">${months[d.getMonth()]}</div>`
        dbox.addEventListener("click", () => {
            document.querySelectorAll(".date-box ").forEach(w => w.classList.remove("selected"));
            dbox.classList.add("selected");
            input.checked = true;
            selectedDate = `${d.getDate()} ${months[d.getMonth()]}`;
            renderTime();
        });
        date.appendChild(dbox);
    }
};
function renderTime() {
    fetch('json/showTime.json')
        .then(response => response.json())
        .then(data => {
            const show = data.find(ele => ele.theatre === selectedTheatre && ele.movie === selectedMovie);
            time.innerHTML = "";
            show.Date[0][selectedDate].forEach(item => {
                const tbox = document.createElement("div");
                tbox.className = "time-box";
                const input = document.createElement("input");
                input.type = "radio";
                input.name = "time";
                input.id = item;
                input.value = item;
                tbox.appendChild(input);
                tbox.innerHTML = `
        <div className="t-time">${item}</div>`
                tbox.addEventListener("click", () => {
                    document.querySelectorAll(".time-box ").forEach(w => w.classList.remove("selected"));
                    tbox.classList.add("selected");
                    input.checked = true;
                    selectedTime = item;
                    renderInfo();
                });
                time.appendChild(tbox);

            })

        });
};
function renderInfo() {
    info.innerHTML = `<div className="theat">${selectedTheatre}</div>
    <div className="dat">${selectedDate}</div>
    <div className="tim">${selectedTime}</div>`
}

//navigate to seat selection page
const button = document.querySelector(".btn");
button.addEventListener('click', (e) => {
    if (e.target.classList.contains("btn-proceed")) {
        localStorage.setItem("title", selectedMovie);
        localStorage.setItem("theatre", selectedTheatre);
        localStorage.setItem("date", selectedDate);
        localStorage.setItem("time", selectedTime);
        localStorage.setItem("screen", screen);
        window.location.href = "seat.html";

    }
});
