let oldtr = "T1";
let newtr = "T1";;
let highlightid = 0;
let colorinput = "rgb(179, 179, 179)";
let colorhighlight = "rgb(147, 211, 147)";
let colorbackgroud = "#f1f1f1";
let colortemp = 0;

  
function highlight(thisid, input) {
  highlightid = Number(thisid.slice(1));
  newtr = thisid;
  if(input == 1)colortemp = colorbackgroud;
  if(input == 2)colortemp = colorinput
  document.getElementById(oldtr).style.backgroundColor = colortemp;
  colortemp = document.getElementById(newtr).style.backgroundColor;
  if(input == 3)colortemp = colorbackgroud;
  document.getElementById(newtr).style.backgroundColor = colorhighlight;
  if(newtr != oldtr)
  {
    oldtr = newtr;
  }
}
function numselect(thisid)
{
  document.getElementById(newtr).innerHTML = document.getElementById(thisid).innerHTML;
  if(document.getElementById(thisid).innerHTML != 0)
    highlight("T"+highlightid, 2);
  else highlight("T"+highlightid, 1);
  //document.getElementById(newtr).style.backgroundColor = colorinput;
}
document.addEventListener("keydown", function onPress(event) 
{
  keypresed(event.keyCode || event.which)
});


function keypresed(key) {
  //console.log(key);
  switch(key)
  {
    case 96:
      document.getElementById(newtr).innerHTML = 0;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid, 1);
      break;
    case 97:
      document.getElementById(newtr).innerHTML = 1;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid, 2);
      break;
    case 98:
      document.getElementById(newtr).innerHTML = 2;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid, 2);
      break;
    case 99:
      document.getElementById(newtr).innerHTML = 3;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid, 2);
      break;
    case 100:
      document.getElementById(newtr).innerHTML = 4;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid, 2);
      break;
    case 101:
      document.getElementById(newtr).innerHTML = 5;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid, 2);
      break;
    case 102:
      document.getElementById(newtr).innerHTML = 6;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid, 2);
      break;
    case 103:
      document.getElementById(newtr).innerHTML = 7;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid, 2);
      break;
    case 104:
      document.getElementById(newtr).innerHTML = 8;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid, 2);
      break;
    case 105:
      document.getElementById(newtr).innerHTML = 9;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid, 2);
      break;
    case 37:
      highlightid -= 1;
      if(highlightid < 1)highlightid = 81;
      highlight("T"+highlightid);
      break;
    case 38:
      highlightid -= 9;
      if(highlightid < 1)highlightid +=81;
      highlight("T"+highlightid);
      break;
    case 39:
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid);
      break;
    case 40:
      highlightid += 9;
      if(highlightid > 81)highlightid -=81;
      highlight("T"+highlightid);
      break;
    case 8:
      highlightid -= 1;
      if(highlightid < 1)highlightid = 81;
      highlight("T"+highlightid, 3);
      document.getElementById(newtr).innerHTML = 0;
      break;
    case 46:
      document.getElementById(newtr).innerHTML = 0;
      highlight("T"+highlightid, 1);
      break;
  }
}
