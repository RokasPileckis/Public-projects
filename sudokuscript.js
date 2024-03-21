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
    case 96:
      document.getElementById(newtr).innerHTML = 0;
    case 97:
      document.getElementById(newtr).innerHTML = 1;
    case 98:
      document.getElementById(newtr).innerHTML = 2;
    case 99:
      document.getElementById(newtr).innerHTML = 3;
    case 100:
      document.getElementById(newtr).innerHTML = 4;
    case 101:
      document.getElementById(newtr).innerHTML = 5;
    case 102:
      document.getElementById(newtr).innerHTML = 6;
    case 103:
      document.getElementById(newtr).innerHTML = 7;
    case 104:
      document.getElementById(newtr).innerHTML = 8;
    case 105:
      document.getElementById(newtr).innerHTML = 9;
  }
}






