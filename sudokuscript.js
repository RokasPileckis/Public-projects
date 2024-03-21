let oldtr = "T1";
let newtr = "T1";;
let highlightid = 0;

  
function highlight(thisid) {
  highlightid = Number(thisid.slice(1));
  newtr = thisid;
  document.getElementById(newtr).style.backgroundColor = "#93D393";
  if(newtr != oldtr)
  {
    if(document.getElementById(oldtr).innerHTML == 0)
    {
      document.getElementById(oldtr).style.backgroundColor = "#D3D3D3";
    }
    else document.getElementById(oldtr).style.backgroundColor = "#b3b3b3";
    oldtr = newtr;
  }
}
function numselect(thisid)
{
  document.getElementById(newtr).innerHTML = document.getElementById(thisid).innerHTML;
  document.getElementById(newtr).style.backgroundColor = "#b3b3b3";
}


document.addEventListener("keydown", function onPress(event) 
{
  keypresed(event.keyCode || event.which)
});


function keypresed(key) {
  switch(key)
  {
    case 96:
      document.getElementById(newtr).innerHTML = 0;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid);
      break;
    case 97:
      document.getElementById(newtr).innerHTML = 1;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid);
      break;
    case 98:
      document.getElementById(newtr).innerHTML = 2;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid);
      break;
    case 99:
      document.getElementById(newtr).innerHTML = 3;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid);
      break;
    case 100:
      document.getElementById(newtr).innerHTML = 4;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid);
      break;
    case 101:
      document.getElementById(newtr).innerHTML = 5;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid);
      break;
    case 102:
      document.getElementById(newtr).innerHTML = 6;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid);
      break;
    case 103:
      document.getElementById(newtr).innerHTML = 7;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid);
      break;
    case 104:
      document.getElementById(newtr).innerHTML = 8;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid);
      break;
    case 105:
      document.getElementById(newtr).innerHTML = 9;
      highlightid += 1;
      if(highlightid > 81)highlightid = 1;
      highlight("T"+highlightid);
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
  }
}

