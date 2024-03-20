let oldtr = "T1";
let newtr = "T1";;

  
function highlight(thisid) {
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
function keyinput(event) {
  let key = event.key;
  switch(key)
    case "0":
      document.getElementById(newtr).innerHTML = 0;
    case "1":
      document.getElementById(newtr).innerHTML = 1;
    case "2":
      document.getElementById(newtr).innerHTML = 2;
    case "3":
      document.getElementById(newtr).innerHTML = 3;
    case "4":
      document.getElementById(newtr).innerHTML = 4;
    case "5":
      document.getElementById(newtr).innerHTML = 5;
    case "6":
      document.getElementById(newtr).innerHTML = 6;
    case "7":
      document.getElementById(newtr).innerHTML = 7;
    case "8":
      document.getElementById(newtr).innerHTML = 8;
    case "9":
      document.getElementById(newtr).innerHTML = 9;
}






