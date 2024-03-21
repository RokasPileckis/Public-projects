let oldtr = "T1";
let newtr = "T1";;

  
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
    case 48:
      document.getElementById(newtr).innerHTML = 0;
    case 49:
      document.getElementById(newtr).innerHTML = 1;
    case 50:
      document.getElementById(newtr).innerHTML = 2;
    case 51:
      document.getElementById(newtr).innerHTML = 3;
    case 52:
      document.getElementById(newtr).innerHTML = 4;
    case 53:
      document.getElementById(newtr).innerHTML = 5;
    case 54:
      document.getElementById(newtr).innerHTML = 6;
    case 55:
      document.getElementById(newtr).innerHTML = 7;
    case 56:
      document.getElementById(newtr).innerHTML = 8;
    case 57:
      document.getElementById(newtr).innerHTML = 9;
  }
}






