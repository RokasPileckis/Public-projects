let sudokugrid = []; <!-- [81] -->
let sudokugridnew = []; <!-- [81] -->
let possiblenumbers = []; <!-- [81][10] -->
let sudokustack = []; <!-- [15][84] -->
let str = "";
let nullamount = 0;
let possiblenumbersamount = 0;

function solve()
{
  initializearrays()
  readsudoku();
  printsudoku();
}


function readsudoku()
{
  for(let i = 0 ; i < 81 ; i++)
  {
    sudokugrid[i] = document.getElementById("T" + (i+1)).innerHTML;
    sudokugridnew[i] = sudokugrid[i];
  }
}
function printsudoku()
{
  let o = 0;
  for(let i = 0 ; i < 81 ; i++)
  {
    str += sudokugrid[i] + " ";
    if((i+1) % 9 == 0)
    {
      o++;
      document.getElementById("output" + o).innerHTML = str;
      str = "";
    }
  }
}
function initializearrays()
{
  for(let i = 0 ; i < 81 ; i++)
  {
    possiblenumbers[i] = [];
    for(let o = 0 ; o < 10 ; o++)
    {
      possiblenumbers[i][o] = 0;
    }
  }
  for(let i = 0 ; i < 15 ; i++)
  {
    sudokustack[i] = [];
    for(let o = 0 ; o < 84 ; o++)
    {
      sudokustack[i][o] = 0;
    }
  }
  
}
function findposiblenumbers()
{
  resetpossiblenumbers();
  possiblenumbersamount = 0;
  for(let i = 0 ; i < 81 ; i++)
  {
    if(sudokugridnew[i] == 0)
    {
      checkcell(i);
      if(possiblenumbers[i][0] > 0)possiblenumbersamount++;
      nullamount++;
    }
  }
}
function resetpossiblenumbers()
{
  for(let i = 0 ; i < 81 ; i++)
    for(let o = 0 ; o < 10 ; o++)
      possiblenumbers[i][o] = 0;
}
function checkcell(pos)
{
  let row, col, row3x3, col3x3;
  let match = false;
  for(let i = 1 ; i < 10 ; i++)//Number
  {
    row = Math.floor(pos/9);
    row3x3 = Math.floor(row/3);
    col = pos % 9;
    col3x3 = col % 3;
    match = false;
    for(let o = 0 ; o < 9 ; o++)//position
    {
      if(i == sudokugridnew[row*9+o])match = true;
      if(i == sudokugridnew[o*9+col])match = true;
      
    }
  }
}




