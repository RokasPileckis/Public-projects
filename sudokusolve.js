
let sudokugrid = []; <!-- [81] -->
let sudokugridnew = []; <!-- [81] -->
let possiblenumbers = []; <!-- [81][10] -->
let sudokustack = []; <!-- [15][84] -->
let str = "";
let nullamount = 0;
let possiblenumbersamount = 0;
let done = false;
let stacknr = 0;

function solve()
{
  initializearrays()
  readsudoku();
  printsudoku();
  
  for(let i = 0 ; i < 1000 ; i++)
  {
    findpossiblenumbers();
    fillgrid();
    if(!checksudoku)
    {
      <!-- if(i == 0)sudoku invalid -->
      loadfromstack();
    }
    if(done && nullamount != 0) writestack();
    if(nullamount != possiblenumbersamount) loadfromstack();
    if(done || nullamount == 0)
    {
      <!-- solution found -->
      break;
    }
    if(i == n-1)
    {
      console.log("ciklu limitas pasiektas");
      return 0;
    }
  }
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
  <!--
  creates possiblenumbers and sudokustack arrays
  -->
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
function findpossiblenumbers()
{
  <!--
  checks all cells that have value==0 and finds all possible numbers that can be placed there
  counts cells with value==0
  counts cells with value==0 and have possible numbers
  -->
  resetpossiblenumbers();
  possiblenumbersamount = 0;
  nullamount = 0;
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
  <!--
  checks one place for all possible numbers that can be put there
  i = number that is being cheked
  o = position in row, collum and 3x3 grid
  if a number isnt found in row, collum and 3x3 grid
  then it is valid number and is placed in possiblenumbers array
  -->
  let row, col, row3x3, col3x3;
  let match = false;
  for(let i = 1 ; i < 10 ; i++)
  {
    row = Math.floor(pos/9);
    row3x3 = Math.floor(row/3);
    col = pos % 9;
    col3x3 = Math.floor(col/3);
    match = false;
    for(let o = 0 ; o < 9 ; o++)
    {
      if(i == sudokugridnew[row*9+o])match = true;
      if(i == sudokugridnew[o*9+col])match = true;
      if(i == sudokugridnew[row3x3*27 + Math.floor(o/3)*9 + col3x3*3 + o%3])match = true;
    }
    if(!match) 
    {
      possiblenumbers[pos][i] = i;
      possiblenumbers[pos][0]++;
    }
  }
}
function fillgrid()
{
  <!--
  ckecks possiblenumbers and if there are cells with only one possible number
  then it puts that number in sudokugridnew
  -->
  done = true;
  for(int i = 0 ; i < 81 ; i++)
  {
    if(possiblenumbers[i][0] == 1)
    {
      for(int o = 1 ; o < 10 ; o++)
      {
        if(possiblenumbers[i][o] != 0)
        {
          sudokugridnew[i] = possiblenumbers[i][o];
          done = false;
          break;
        }
      }
    }
  }
}
function checksudoku()
{
  <!--
  checks sudoku if it has two of the same number in row, col or 3x3 grid
  if true, then it is ivnalid sudoku and returns false
  -->
  let row, col row3x3, col3x3;
  for(let i = 0 ; i < 81 ; i++)
  {
    row = Math.floor(i/9);
    row3x3 = Math.floor(row/3);
    col = i % 9;
    col3x3 = Math.floor(col/3);
    
    for(let pos = 0 ; pos < 9 ; pos++)
    {
      if(sudokugridnew[i] != 0)
      {
        if(i != row*9 + pos)
          if(sudokugridnew[i] == sudokugridnew[row*9 + pos])return false;
        if(i != pos*9 + col)
          if(sudokugridnew[i] == sudokugridnew[pos*9 + col])return false;
        if(i != row3x3*27 + Math.floor(o/3)*9 + col3x3*3 + o%3)
          if(sudokugridnew[i] == sudokugridnew[row3x3*27 + Math.floor(o/3)*9 + col3x3*3 + o%3])return false;
      }
    }
  }
  return true;
}
function savetostack()
{
  writestack();
  let result[location, selectednumber] = findsplitlocation();
  sudokustack[stacknr][1] = location;
  sudokustack[stacknr][2] = selectednumber;
  sudokugridnew[location] = selectednumber;
  done = false;
}
function loadfromstack()
{
  
}
function writestack()
{
  for(int i = 3 ; i < 84 ; i++)
  {
    sudokustack[stacknr][i] = sudokugrid[i-3];
  }
  sudokustack[stacknr][0] = 1;
  stacknr++;
}
function findsplitlocation()
{
  let minchoce = 9;
  let location, selectednumber;
  for(int i = 0 ; i < 81 ; i++)
  {
    if(possiblenumbers[i][0] > 0)
      if(possiblenumbers[i][0] < minchoce)
        minchoce = possiblenumbers[i][0];
  }
  for(int i = 0 ; i < 81 ; i++)
  {
    if(possiblenumbers[i][0] == minchoce)
    {
      location = i;
      for(int o = 1 ; o < 10 ; o++)
      {
        if(possiblenumbers[i][o] != 0)
        {
          selectednumber = o;
          return [location, selectednumber];
        }
      }
    }
  }
}






