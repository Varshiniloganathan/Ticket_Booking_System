//to show selected movie details
const dt = localStorage.getItem("date");
const t = localStorage.getItem("time");
const title = document.querySelector(".movie");
const theatre = document.querySelector(".theatre");
const time = document.querySelector(".time");
const titleh = document.createElement("h3");
titleh.textContent = localStorage.getItem("title");
title.appendChild(titleh);
const theatreh = document.createElement("h3");
theatreh.textContent = localStorage.getItem("theatre");
theatre.appendChild(theatreh);
const timeh = document.createElement("h3");
timeh.textContent = `${dt}&${t}`;
time.appendChild(timeh);
//to update selected seat and price
const seatDet = document.getElementById("seat-sum");
const priceDet = document.getElementById("price-sum");
//updating no of tickets
let count = 0;
const cnt = document.querySelector(".count")
const increaseBtn = document.querySelector(".inccntbtn");
const decreaseBtn = document.querySelector(".deccntbtn");
function updateCount() {
    cnt.textContent = count;
}
function increaseCount() {
    if (count > 9) {
        alert("Atmost 10 tickets only allowed for online booking.");
    }
    else {
        count++;
        updateCount();
        localStorage.setItem('count', count);
    }

}
function decreaseCount() {
    if (count <= 1) {
        alert("Atleast 1 ticket.");
    }
    else {
        count--;
        updateCount();
        localStorage.setItem('count', count);

    }
}
increaseBtn.addEventListener('click', increaseCount);
decreaseBtn.addEventListener('click', decreaseCount);
// //limit checkbox selection based on the number of tickets user want
let selected = [];
document.addEventListener('DOMContentLoaded', function() {
    const cbox = document.querySelectorAll(".seat-cb");
    cbox.forEach(checkbox => {
        checkbox.addEventListener("click",function(){
            noofticket = localStorage.getItem("count");
            const checkedBox = document.querySelectorAll(".seat-cb:checked");
            const checkedCount = checkedBox.length;
            if(this.checked && checkedCount > noofticket){
            this.checked = false;
            alert(`Only ${noofticket} can be selected`);
        }
        if (this.checked) {
            selected.push(this.id);
            localStorage.setItem('seatNo',selected);
            seatDet.textContent=selected;
        }
        else {
            selected = selected.filter(seat => seat !== this.id);  // remove seat if unchecked
        }

    })
})
});

