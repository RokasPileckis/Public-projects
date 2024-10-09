let pixeldata;
let image;
let colorwall = 0;
let colorpath = 0;
let exit = [];
let wallthickness;
let paththickness;
let cellsvertical;
let cellshorizontal;
let nodes = []; // list of path corners and junctions
let exits = [];
let pathlist = [];
let context;
let path = [];


function loadFile(event) 
{
  image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
}
function solve()
{
  reset();
  setupcanvas();
  
  print("-----")
  print("width " + image.width);
  print("height " + image.height);
  print("number of pixels " + pixeldata.data.length);
  
  findcolors();
  //findexitpixel();
  nodesize();
  findnodes();
  //printnodes(nodes);
  connectnodes();
  astar();
  if(pathlist.length == 0)return;
  findpath();
  drawpath();
  print("path length in cells: " + pathlist[0].distance);
  
  //optimize find nodes
    //remove getnodecolor call, or optimize it
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
function findexitpixel()
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

  context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0);
  pixeldata = context.getImageData(0, 0, canvas.width, canvas.height);
}
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
  cellsvertical = (height - wallthickness)/(wallthickness + paththickness)*2 + 1;
  cellshorizontal = (width - wallthickness)/(wallthickness + paththickness)*2 + 1;
  
  //print("paththickness " + paththickness);
  //print("wallthickness " + wallthickness);
  print("number of cells horizontal " + cellshorizontal);
  print("number of cells vertical  " + cellsvertical);
}
function findnodes()
{
  //print("findnodes");
  let pos;
  let color;
  nodes.length = 0;
  for(let y = 0 ; y < cellsvertical ; y++)//find all nodes
  {
    for(let x = 0 ; x < cellshorizontal ; x++)
    {
      pos = nodeposition(x, y);
      color = getcolor(pos*4);
      if(color == colorpath)
      {
        if(x == 0 || x == cellshorizontal-1 || y == 0 || y == cellsvertical-1)
        {
          nodes.push({
            position: pos,
            posx: x,
            posy: y,
            inlist: false,
            isexit: true
          });
        }
        else if((getnodecolor(x-1, y) != getnodecolor(x+1, y)) || (getnodecolor(x, y-1) != getnodecolor(x, y+1)))
        {
          nodes.push({
            position: pos,
            posx: x,
            posy: y,
            inlist: false,
            isexit: false
          });
        }
        else if((getnodecolor(x-1, y) == getnodecolor(x+1, y)) && (getnodecolor(x-1, y) == getnodecolor(x, y+1)) && (getnodecolor(x-1, y) == getnodecolor(x, y-1)))
        {
          nodes.push({
            position: pos,
            posx: x,
            posy: y,
            inlist: false,
            isexit: false
          });
        }
      }
    }
  }
  print("number of nodes: " + nodes.length);
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
  return getcolor(nodeposition(x, y)*4);
}
function printnodes(node)
{
  //print("printnodes");
  //print(node.length);
  let string;
  for(let i = 0 ; i < node.length ; i++)
  {
    string = "";
    string += "id: " + i +  " pos y x: " + node[i].posy + " " + node[i].posx;
    if(node[i].isexit) string += " exit";
    print(string);
  }
}
function connectnodes()
{
  /*
  if neighbour is path, add this node to neighbour
  */
  let x, y, xmax, ymax;
  xmax = nodes[nodes.length-1].posx;
  ymax = nodes[nodes.length-1].posy;
  for(let i = 0 ; i < nodes.length ; i++)
  {
    nodes[i].id = i;
    x = nodes[i].posx;
    y = nodes[i].posy;
    nodes[i].neighbourid = [];
    nodes[i].neighbourid[1] = -1;
    nodes[i].neighbourid[2] = -1;
    nodes[i].neighbourid[3] = -1;
    nodes[i].neighbourid[4] = -1;
    if(nodes[i].isexit)//if node is exit
    {
      if(x == 0)//left
      {
        nodes[i].neighbourid[1] = i+1;
      }
      if(x == xmax)//right
      {
        nodes[i].neighbourid[2] = i-1;
      }
      if(y == 0)//top
      {
        for(let o = i+1 ; o < nodes.length ; o++)
        {
          if(nodes[o].posx == x)
          {
            nodes[i].neighbourid[3] = o;
            break;
          }
        }
      }
      if(y = ymax)//bottom
      {
        for(let o = i-1 ; o >= 0 ; o--)
        {
          if(nodes[o].posx == x)
          {
            nodes[i].neighbourid[4] = o;
            break;
          }
        }
      }
      
    }
    else//if node is not exit
    {
      if(getnodecolor(x-1, y) == colorpath)//left
      {
        nodes[i].neighbourid[1] = i-1;
      }
      if(getnodecolor(x+1, y) == colorpath)//right
      {
        nodes[i].neighbourid[2] = i+1;
      }
      if(getnodecolor(x, y+1) == colorpath)//bottom
      {
        for(let o = i+1 ; o < nodes.length ; o++)
        {
          if(nodes[o].posx == x)
          {
            nodes[i].neighbourid[3] = o;
            break;
          }
        }
      }
      if(getnodecolor(x, y-1) == colorpath)//top
      {
        for(let o = i-1 ; o >= 0 ; o--)
        {
          if(nodes[o].posx == x)
          {
            nodes[i].neighbourid[4] = o;
            break;
          }
        }
      }
    }
    //print("id: " + i);
    //print("nb1: " + nodes[i].neighbourid[1]);
    //print("nb2: " + nodes[i].neighbourid[2]);
    //print("nb3: " + nodes[i].neighbourid[3]);
    //print("nb4: " + nodes[i].neighbourid[4]);
  }
}
function distanceaprox(i1, i2)
{
  let x1, x2, y1, y2;
  x1 = nodes[i1].posx;
  x2 = nodes[i2].posx;
  y1 = nodes[i1].posy;
  y2 = nodes[i2].posy;
  return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}
function astar()
{
  print("a*");
  for(let i = 0 ; i < nodes.length ; i++)//find exits;
  {
    if(nodes[i].isexit)
    {
      exits.push(nodes[i]);
      print("exit: " + i);
    }
  }
  
  pathlist.push({ //add first exit to path list
    id: exits[0].id,
    distance: 0
    });
      
  nodes[pathlist[0].id].inlist = true;   
  nodes[pathlist[0].id].disstart = 0;
  //printlist();
  
  let i = 0;
  while(pathlist.length>0)
  {
    if(i>0)
      if(nodes[pathlist[0].id].isexit)break;
    addneighbour(pathlist[0].id);//add neighbour to list
    boublesort();//sort list
    //drawnode(nodes[pathlist[0].id].posx, nodes[pathlist[0].id].posy)
    i++;
    //print(pathlist[0].distance);
    //if(i%1000 == 0)print(i);
    //if(i>5000)break;
    //print(pathlist[0].id);
    //print(pathlist.length);
    //print(i);
    //printlist();
  }
  print(i);
  if(pathlist.length > 0)
    print("path found");
  else print("failed");
}
function addneighbour(oldid)
{
  let x, y, newid;
  for(let i = 1 ; i < 5 ; i++)//loop through neighbours
  {
    newid = nodes[oldid].neighbourid[i];
    if(newid != -1 && !nodes[newid].inlist)
    {
      //print(newid);
      x = Math.abs(nodes[oldid].posx - nodes[newid].posx);
      y = Math.abs(nodes[oldid].posy - nodes[newid].posy);
      nodes[newid].disstart = nodes[oldid].disstart + x + y;
      //print(nodes[oldid].disstart);
      
      pathlist.push({
        id: newid,
        distance: nodes[newid].disstart + distanceaprox(newid, exits[1].id)
        
      });
      nodes[newid].prenodeid = oldid;
      nodes[newid].inlist = true;
    }
  }
  if(pathlist.length > 1)//delete first element
  {
    for(let i = 0 ; i < pathlist.length-1 ; i++)
    {
      pathlist[i] = pathlist[i+1];
    }
    pathlist.length--;
  }
  else pathlist.length--;
}
function boublesort()
{
  let temp;
  for(let i = 0 ; i < pathlist.length-1 ; i++)
  {
    for(let o = 0 ; o < pathlist.length-i-1 ; o++)
    {
      if(pathlist[o].distance > pathlist[o+1].distance)
      {
        temp = pathlist[o+1];
        pathlist[o+1] = pathlist[o];
        pathlist[o] = temp;
      }
    }
  }
}
function findpath()
{
  let newid;
  let oldid;
  
  oldid = pathlist[0].id;
  
  path.push(oldid);
  
  newid = nodes[oldid].prenodeid;
  oldid = newid;
  
  path.push(oldid);
  
  for(let i = 0 ; i < 1000000 ; i++)
  {
    if(nodes[oldid].isexit)break;
    newid = nodes[oldid].prenodeid;
    oldid = newid;
    
    path.push(oldid);
  }
  print("path length in nodes: " + path.length);
}
function printlist()
{
  print("list");
  for(let i = 0 ; i < pathlist.length ; i++)
  {
    print(pathlist[i].id);
  }
  print("end of list");
}
function drawnode(px, py)
{
  let x, y;
  x = nodeposition(px, py) % image.width;
  y = Math.floor(nodeposition(px, py) / image.width);
  
  context.fillStyle = "red";
  context.fillRect(x, y, paththickness, paththickness);
}
function drawpath()
{
  for(let i = 0 ; i < path.length ; i++)
  {
    let id = path[i];
    drawnode(nodes[id].posx, nodes[id].posy);
    //draw in between nodes
    if(i < path.length-1)
      drawgap(path[i], path[i+1]);
  }
}
function reset()
{
  colorwall = 0;
  colorpath = 0;
  exit = [];
  wallthickness = 0;
  paththickness = 0;
  cellsvertical = 0;
  cellshorizontal = 0;
  nodes = []; // list of path corners and junctions
  exits = [];
  pathlist = [];
  path = [];
}
function drawgap(id1, id2)
{
  let x1, x2, y1, y2, id, dx, dy;
  x1 = nodes[id1].posx;
  x2 = nodes[id2].posx;
  y1 = nodes[id1].posy;
  y2 = nodes[id2].posy;
  dx = x1 - x2;
  dy = y1 - y2;
  
  if(dx>1)
  {
    for(let i = x2+1 ; i < x1 ; i++)
    {
      drawnode(i, y1);
    }
  }
  if(dx<1)
  {
    for(let i = x1+1 ; i < x2 ; i++)
    {
      drawnode(i, y1);
    }
  }
  if(dy>1)
  {
    for(let i = y2+1 ; i < y1 ; i++)
    {
      drawnode(x1, i);
    }
  }
  if(dy<1)
  {
    for(let i = y1+1 ; i < y2 ; i++)
    {
      drawnode(x1, i);
    }
  }
}
//debug function
//draw nodes in pathlist and buton to increment the main loop
