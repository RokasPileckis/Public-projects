let pixeldata;
let image;
let colorwall = 0;
let colorpath = 0;
let exit = [];
let wallthickness;
let paththickness;
let cellsvertical;
let cellshorizontal;
let possiblenodes = [];

function loadFile(event) 
{
  image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
}
function solve()
{
  setupcanvas();
  
  print("-----")
  print("width " + image.width);
  print("height " + image.height);
  print("number of pixels " + pixeldata.data.length);
  
  findcolors();
  findexit();
  nodesize();
  findnodes();
}
function findcolors()
{
  let colortemp = 0;
  colorwall = getcolor(0);
  for(let i = 0 ; i < pixeldata.data.length ; i+=4)
  {
    colortemp = getcolor(i);
    if(colorwall != colortemp)
    {
      colorpath = colortemp;
      break;
    }
  }
  print("wall color: " + colorwall);
  print("path color: " + colorpath);
}
function findexit()
{
  let exitnr;
  exit[0] = 0;
  let width = image.width;
  let height = image.height;
  let color = 0;
  let path = false;
  for(let i = 0 ; i < width ; i++)//top side
  {
    color = getcolor(i*4);
    if(color == colorwall) path = false;
    if(color == colorpath && !path)
    {
      exitnr = exit[0]*2;
      exit[exitnr+1] = 0;
      exit[exitnr+2] = i;
      exit[0]++;
      path = true;
    }
  }
  for(let i = 0 ; i < height ; i++)//right side
  {
    color = getcolor(i*width*4 + (width-1)*4);
    if(color == colorwall) path = false;
    if(color == colorpath && !path)
    {
      exitnr = exit[0]*2;
      exit[exitnr+1] = i;
      exit[exitnr+2] = width-1;
      exit[0]++;
      path = true;
    }
  }
  for(let i = 0 ; i < width ; i++)//bottom side
  {
    color = getcolor((width)*(height-1)*4 + i*4);
    if(color == colorwall) path = false;
    if(color == colorpath && !path)
    {
      exitnr = exit[0]*2;
      exit[exitnr+1] = height-1;
      exit[exitnr+2] = i;
      exit[0]++;
      path = true;
    }
  }
  for(let i = 0 ; i < height ; i++)//left side
  {
    color = getcolor(i*width*4);
    if(color == colorwall) path = false;
    if(color == colorpath && !path)
    {
      exitnr = exit[0]*2;
      exit[exitnr+1] = i;
      exit[exitnr+2] = 0;
      exit[0]++;
      path = true;
    }
  }
  print("number of exits: " + exit[0]);
  for(let i = 0 ; i < exit[0] ; i++)
    print("exit " + i + ": " + exit[i*2+1] + " " + exit[i*2+2]);
}
function getcolor(index)
{
  return pixeldata.data[index]*1000000 + pixeldata.data[index+1]*1000 + pixeldata.data[index+2];
}
function print(text)
{
  console.log(text);
}
function setupcanvas()
{
  let canvas = document.getElementById('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  let context = canvas.getContext('2d', willReadFrequently = true);
  context.drawImage(image, 0, 0);
  pixeldata = context.getImageData(0, 0, canvas.width, canvas.height);
}
//function find nodes
//function connect nodes
//function add nodes to list
//function sort list
//function draw nodes
//function draw path
//function nodes pixel size and wall thickness
function nodesize()
{
  let width = image.width;
  let height = image.height;
  wallthickness = width;
  paththickness = width;
  let countwall = 0;
  let countpath = 0;
  let index;
  let color;

  for(let i = 0 ; i < height ; i++)
  {
    countwall = 0;
    countpath = 0;
    for(let o = 0 ; o < width ; o++)
    {
      index = i * height + o;
      color = getcolor(index*4);
      if(color == colorwall)
      {
        countwall++;
        if(countpath > 0 && countpath < paththickness)
        {
          paththickness = countpath;
        }
        countpath = 0;
      }
      if(color == colorpath)
      {
        countpath++;
        if(countwall > 0 && countwall < wallthickness)
        {
          wallthickness = countwall;
        }
        countwall = 0;
      }
    }
  }
  print("paththickness " + paththickness);
  print("wallthickness " + wallthickness);
  cellsvertical = (height - wallthickness)/(wallthickness + paththickness)*2 + 1;
  cellshorizontal = (width - wallthickness)/(wallthickness + paththickness)*2 + 1;
  print("number of cells horizontal " + cellshorizontal);
  print("number of cells vertical  " + cellsvertical);
  
}
function findnodes()
{
  print("findnodes");
  let pos;
  let color;
  //let possiblenodes = []; //list of all possible nodes, including walls
  let nodes = []; //list of nodes of maze
  let x, y;
  for(let i = 0 ; i < cellsvertical ; i++)//find all nodes
  {
    for(let o = 0 ; o < cellshorizontal ; o++)
    {
      pos = nodeposition(o, i);
      color = getcolor(pos*4);
      if(color == colorwall)//wall node
      {
        possiblenodes.push({
          position: pos,
          posx: o,
          posy: i,
          ispath: false
        });
      }
      if(color == colorpath)//path node
      {
        possiblenodes.push({
          position: pos,
          posx: o,
          posy: i,
          ispath: true
        });
      }
    }
  }
  print(possiblenodes.length);
  for(let i = 0 ; i < possiblenodes.length ; i++)//find maze nodes
  {
    if(possiblenodes[i].ispath)
    {
      x = possiblenodes[i].posx;
      y = possiblenodes[i].posy;
      //print("path " + i);
      if(x == 0 || x == cellshorizontal-1 || y == 0 || y == cellsvertical-1)
      {
        possiblenodes[i].isexit = true;
        nodes.push(possiblenodes[i]);
      }
      else if((getnodecolor(x-1, y) != getnodecolor(x+1, y)) || (getnodecolor(x, y-1) != getnodecolor(x, y+1)))
      {
        nodes.push(possiblenodes[i]);
        //print("push");
      }
    }
  }
  //print(possiblenodes.length);
  //print(nodes.length);
  printnodes(nodes);
}
function nodeposition(x, y)
{
  let width = image.width;
  posx = (Math.floor(x/2) * (wallthickness + paththickness)) + ((x%2) * wallthickness);
  posy = ((Math.floor(y/2) * (wallthickness + paththickness)) + ((y%2) * wallthickness)) * width;
  return posy+posx;
}
function getnodecolor(x, y)
{
  //print("getnodecolor");
  for(let i = 0 ; i < possiblenodes.length ; i++)
  {
    if(possiblenodes[i].posx == x && possiblenodes[i].posy == y)
    {
      return getcolor(possiblenodes[i].position*4);
    }
  }
}
function printnodes(nodes)
{
  print("printnodes");
  print(nodes.length);
  let string;
  for(let i = 0 ; i < nodes.length ; i++)
  {
    string = "";
    string += "pos y x: " + nodes[i].posy + " " + nodes[i].posx;
    if(nodes[i].isexit) string += " exit";
    print(string);
  }
}

