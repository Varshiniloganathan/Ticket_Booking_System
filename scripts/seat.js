//to show selected movie details
const title = document.querySelector(".title");
const detail = document.querySelector(".details");
title.textContent = localStorage.getItem("title");
const p1 = document.createElement("p");
p1.innerText = localStorage.getItem("theatre");
var date = document.createTextNode(localStorage.getItem("date"));
var time = document.createTextNode(localStorage.getItem("time"));
var screen = document.createTextNode(localStorage.getItem("screen"));
var sym1 = document.createTextNode("|");
var sym2 = document.createTextNode("|");
var sym3 = document.createTextNode("|");
var sp1 = document.createTextNode(" ");
var sp2 = document.createTextNode(" ");
var sc = document.createTextNode("Screen: ");
detail.appendChild(p1);
p1.appendChild(sp1);
p1.appendChild(sym1);
p1.appendChild(date);
p1.appendChild(sp2);
p1.appendChild(sym2);
p1.appendChild(time);
p1.appendChild(sym3);
p1.appendChild(sc);
p1.appendChild(screen);
let selected = new Array();
//limit checkbox selection based on the number of tickets user want
document.addEventListener('DOMContentLoaded', function()  {
    const seat = document.querySelector(".row-label");
    const cbox = document.querySelectorAll(".seat-cb");
    cbox.forEach(checkbox => {
        checkbox.addEventListener("click", function() {
            const nooftickets = parseInt(document.getElementById("tickets").value) || 0;
            const checkedBox = document.querySelectorAll(".seat-cb:checked");
            const checkedCount = checkedBox.length;
            
            if (this.checked && checkedCount > nooftickets) {
                this.checked = false;
                document.getElementById("error-msg").textContent =
                    "You can select only " + nooftickets + " seats.";
                return;
            }
            else{
                 document.getElementById("error-msg").textContent = "";
            }
            if (this.checked) {
                selected.push(this.id);
             } //else {
            //     selected = selected.filter(seat => seat !== this.id);  // remove seat if unchecked
            // }
           

        });

    });

});



