
let sudokugrid = []; // [81]
let sudokugridnew = []; // [81]
let possiblenumbers = []; // [81][10]
let sudokustack = []; // [maxstack][84]
let nullamount = 0;
let possiblenumbersamount = 0;
let done = false;
let stacknr = 0;
let maxstack = 50;
let stackused = 0;
let nosolution = false;

function solve()
{
  stackused = 0;
  nosolution = false;
  document.getElementById("output").innerHTML = "";
  nullamount = 0;
  possiblenumbersamount = 0;
  done = false;
  stacknr = 0;
  initializearrays()
  readsudoku();
  let i, nmax = 1000;
  
  for(i = 0 ; i < nmax ; i++)
  {
    console.log("-----");
    console.log("i: " + i);
    findpossiblenumbers();
    fillgrid();
    console.log("possiblenumbersamount: " + possiblenumbersamount);
    //console.log("nullamount: " + nullamount);
    //console.log("done: " + done);
    console.log("stacknr: " + stacknr);
    if(!checksudoku())
    {
      if(i == 0)console.log("sudoku invalid");
      loadfromstack();
    }
    if(done && nullamount != 0) savetostack();
    if(nullamount != possiblenumbersamount) loadfromstack();
    if(checksudoku() && nullamount == 0)
    {
      console.log("solution found");
      break;
    }
    if(i == nmax-1)
    {
      console.log("ciklu limitas pasiektas");
      return 0;
    }
    if(stacknr == maxstack-1)
    {
      console.log("stack limit reached");
      break;
    }
    if(nosolution)
    {
      document.getElementById("output").innerHTML = "No solution found, sudoku invalid";
      console.log("ciklu skaicius: " + i);
      console.log("stack used: " + stackused);
      return 0;
    }
  }
  console.log("ciklu skaicius: " + i);
  console.log("stack used: " + stackused);
  
  printsudoku(sudokugridnew);
}


function readsudoku()
{
  for(let i = 0 ; i < 81 ; i++)
  {
    sudokugrid[i] = document.getElementById("T" + (i+1)).innerHTML;
    sudokugridnew[i] = sudokugrid[i];
  }
}
function printsudoku(grid)
{
  for(let i = 0 ; i < 81 ; i++)
  {
    document.getElementById("T" + (i+1)).innerHTML = grid[i];
  }
}
function initializearrays()
{
  /*
  creates possiblenumbers and sudokustack arrays
  */
  for(let i = 0 ; i < 81 ; i++)
  {
    possiblenumbers[i] = [];
    for(let o = 0 ; o < 10 ; o++)
    {
      possiblenumbers[i][o] = 0;
    }
  }
  for(let i = 0 ; i < maxstack ; i++)
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
  /*
  checks all cells that have value==0 and finds all possible numbers that can be placed there
  counts cells with value==0
  counts cells with value==0 and have possible numbers
  */
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
  /*
  checks one place for all possible numbers that can be put there
  i = number that is being cheked
  o = position in row, collum and 3x3 grid
  if a number isnt found in row, collum and 3x3 grid
  then it is valid number and is placed in possiblenumbers array
  */
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
  /*
  ckecks possiblenumbers and if there are cells with only one possible number
  then it puts that number in sudokugridnew
  */
  done = true;
  for(let i = 0 ; i < 81 ; i++)
  {
    if(possiblenumbers[i][0] == 1)
    {
      for(let o = 1 ; o < 10 ; o++)
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
  /*
  checks sudoku if it has two of the same number in row, col or 3x3 grid
  if true, then it is ivnalid sudoku and returns false
  */
  let row, col, row3x3, col3x3;
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
        if(i != row3x3*27 + Math.floor(pos/3)*9 + col3x3*3 + pos%3)
          if(sudokugridnew[i] == sudokugridnew[row3x3*27 + Math.floor(pos/3)*9 + col3x3*3 + pos%3])return false;
      }
    }
  }
  return true;
}
function savetostack()
{
  /*
  coppies current sudoju grid into stack and quesses a number
  form possible numbers
  */
  let output = {location:0, selectednumber:0};
  let location, selectednumber;
  //console.log("savetostack");
  writestack();
  findsplitlocation(output);
  location = output.location;
  selectednumber = output.selectednumber;
  //console.log("location " + location);
  //console.log("selectednumber " + selectednumber);
  sudokustack[stacknr][1] = location;
  sudokustack[stacknr][2] = selectednumber;
  sudokugridnew[location] = selectednumber;
  done = false;
}
function loadfromstack()
{
  if(stacknr == 0)
  {
    console.log("no solution found");
    nosolution = true;
    return 0;
  }
  let location, selectednumber, quessnumber;
  readstack();
  findpossiblenumbers();
  location = sudokustack[stacknr][1];
  selectednumber = sudokustack[stacknr][2];
  possiblenumbers[location][selectednumber] = 0;
  quessnumber = nextpossiblenumber(location, selectednumber);
  if(quessnumber != 0)
  {
    sudokugridnew[location] = quessnumber;
    sudokustack[stacknr][2] = quessnumber;
  }
  else
  {
    sudokustack[stacknr][0] = 0;
    stacknr--;
    location = sudokustack[stacknr][1];
    selectednumber = sudokustack[stacknr][2];
    loadfromstack();
  }
}
function readstack()
{
  for(let i = 3 ; i < 84 ; i++)
  {
    sudokugridnew[i-3] = sudokustack[stacknr-1][i];
  }
}
function writestack()
{
  for(let i = 3 ; i < 84 ; i++)
  {
    sudokustack[stacknr][i] = sudokugridnew[i-3];
  }
  sudokustack[stacknr][0] = 1;
  stacknr++;
  if(stacknr > stackused)stackused = stacknr;
}
function findsplitlocation(output)
{
  let minchoce = 9;
  let location, selectednumber;
  for(let i = 0 ; i < 81 ; i++)
  {
    if(possiblenumbers[i][0] > 0)
      if(possiblenumbers[i][0] < minchoce)
        minchoce = possiblenumbers[i][0];
  }
  for(let i = 0 ; i < 81 ; i++)
  {
    if(possiblenumbers[i][0] == minchoce)
    {
      location = i;
      for(let o = 1 ; o < 10 ; o++)
      {
        if(possiblenumbers[i][o] != 0)
        {
          selectednumber = o;
          output.location = location;
          output.selectednumber = selectednumber;
          return 0;
        }
      }
    }
  }
}
function nextpossiblenumber(location, selectednumber)
{
  for(let i = selectednumber+1 ; i < 10 ; i++)
  {
    if(possiblenumbers[location][i] != 0)
    {
      return i;
    }
  }
  return 0;
}
function reset()
{
  for(let i = 0 ; i < 81 ; i++)
  {
    document.getElementById("T" + (i+1)).innerHTML = 0;
    document.getElementById("T" + (i+1)).style.backgroundColor = "#D3D3D3";
  }
  document.getElementById("output").innerHTML = "";
  readsudoku();
}
function clearsolution()
{
  printsudoku(sudokugrid);
}




