let cell = null;
let colorgray  = "rgb(179, 179, 179)";
let colorgreen = "rgb(147, 211, 147)";
let colorpink  = "rgb(255, 192, 203)";
let colorbackground = document.body.style.backgroundColor;

const keys = {
  '0'         :  1,
  '1'         :  1,
  '2'         :  1,
  '3'         :  1,
  '4'         :  1,
  '5'         :  1,
  '6'         :  1,
  '7'         :  1,
  '8'         :  1,
  '9'         :  1,
  'ArrowLeft' : -1,
  'ArrowUp'   : -9,
  'ArrowRight':  1,
  'ArrowDown' :  9
}

document.addEventListener("keydown", (event) => keypresed(event.key));

highlight("T1");

function highlight(position)
{
  if (cell != null) {
    if (document.getElementById(cell).innerHTML != 0 && done === false) { // "done" is from sudokusolve.js
      changeColor(cell, colorgray);
    } else {
      changeColor(cell, colorbackground);
    }
  }
  changeColor(cell = position, colorgreen);
}

function numselect(number)
{
  document.getElementById(cell).innerHTML = document.getElementById(number).innerHTML;
  changeColor(number, colorpink);
  setTimeout(() => {
    changeColor(number, colorbackground);
  }, 100); // highlight the number for 100ms (0.1s)
}


function keypresed(key)
{
  if (key in keys) {
    if (key >= '0' && key <= '9') {
      numselect("N" + Number(key));
    }
    let id = Number(cell.slice(1)) + keys[key];
    if (id > 81) id = 1;
    if (id < 1 ) id = 81;
    highlight("T" + id);
  }
}

function changeColor(id, color)
{
  if (id != null) document.getElementById(id).style.backgroundColor = color;
}