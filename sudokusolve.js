const sudokugrid = [];

function solve()
{
  readsudoku();
  printsudoku();
}


function readsudoku()
{
  for(let i = 0 ; i < 81 ; i++)
  {
    sudokugrid[i] = document.getElementById("T" + (i+1)).innerHTML;
  }
}
function printsudoku()
{
  for(let i = 0 ; i < 81 ; i++)
  {
    console.log(sudokugrid[i]); 
  }
}




