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
