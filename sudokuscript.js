let oldtr = "T1";
let newtr = "T1";;
let highlightid = 0;

  
function highlight(thisid) {
  
  console.log(thisid);
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
  console.log(key);
  switch(key)
  {
    case 96:
      document.getElementById(newtr).innerHTML = 0;
      break;
    case 97:
      document.getElementById(newtr).innerHTML = 1;
      break;
    case 98:
      document.getElementById(newtr).innerHTML = 2;
      break;
    case 99:
      document.getElementById(newtr).innerHTML = 3;
      break;
    case 100:
      document.getElementById(newtr).innerHTML = 4;
      break;
    case 101:
      document.getElementById(newtr).innerHTML = 5;
      break;
    case 102:
      document.getElementById(newtr).innerHTML = 6;
      break;
    case 103:
      document.getElementById(newtr).innerHTML = 7;
      break;
    case 104:
      document.getElementById(newtr).innerHTML = 8;
      break;
    case 105:
      document.getElementById(newtr).innerHTML = 9;
      break;
    case 37:
      highlightid -= 1;
      if(highlightid == 0)highlightid = 81;
      highlight("T"+highlightid);
      break;
    case 38:
      highlightid += 9;
      if(highlightid > 81)highlightid -=72;
      highlight("T"+highlightid);
      break;
    case 39:
      highlightid += 1;
      if(highlightid == 82)highlightid = 1;
      highlight("T"+highlightid);
      break;
    case 40:
      highlightid -= 9;
      if(highlightid < 1)highlightid +=72;
      highlight("T"+highlightid);
      break;
  }
}






