let pixeldata;
let context;
let posx = 0;
let posy = 0;
let keys = [];
let run = false;
let width = 300;
let height = 200;
let nodes = [];
let runanimation = false;
let imgData;
let densitygrid = [];
let gridsize = 10;

function setupcanvas()
{
  let canvas = document.getElementById('canvas');
  document.getElementById("canvas").style.display="block";
  canvas.width = width;
  canvas.height = height;

  context = canvas.getContext('2d', { willReadFrequently: true });
  context.globalAlpha = 0.2;
  
  print("setup")
  
  drawborder();
  generatedensitygrid();

}
function drawpixel(x, y, color)
{
  context.fillStyle = color;
  context.fillRect(x, y, 1, 1);
}
async function draw()
{
  if(!run)
  {
    run = true;
    print("drawing started");
  }
  else 
  {
    run = false;
    print("drawing stoped");
  }
  while(run)
  {
    if(keys[39])if(posx < canvas.width-1)posx++;
    if(keys[37])if(posx > 0)posx--;
    if(keys[38])if(posy > 0)posy--;
    if(keys[40])if(posy < canvas.height-1)posy++;
    drawpixel(posx, posy, "red");
    await sleep(0);
  }
  
  print("done")
}
function print(text)
{
  console.log(text);
}
function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener("keydown", function onPress(event) 
{
  keys[event.keyCode] = true;
});
document.addEventListener("keyup", function onPress(event) 
{
  keys[event.keyCode] = false;
});
//document.addEventListener("mousemove", mousemove);
document.addEventListener("click", mouseclick);

function mousemove()
{
  let x = event.offsetX;
  let y = event.offsetY;
  //drawpixel(x, y, "red");
  //print(x+y);
};
function mouseclick()
{
  let x = event.pageX;
  let y = event.pageY;
  
  if(inbounds(x, y, "canvas"))
  {
    x = event.offsetX;
    y = event.offsetY;

    drawfill(x, y, "blue", 10);
    nodes.push({
      posx: x,
      posy: y,
      velx: (Math.random()-0.5)*10,
      vely: 0,
    });
    
  }
  
}
function drawfill(x, y, color, size)
{
  context.fillStyle = color;
  context.fillRect(x-size/2, y-size/2, size, size);
}
function b2()
{
  runanimation = true;
  animation();
}
function inbounds(x, y, id)//checks if mouse click is in canvas
{
  let element = document.getElementById(id);
  let rect = element.getBoundingClientRect();
  
  if(x >= rect.left && x <= rect.right)
    if(y >= rect.top && y <= rect.bottom)
      return true;
      
  return false;
}
function b3()
{
  runanimation = false;
}
function b1()
{
  calculatevelocity();
}
function drawborder()
{
  context.strokeRect(0, 0, width, height);
}
function calculatevelocity()
{
  let deltatime = 0.05;
  let gravity = 9.81;
  let airresistance = 0.99;
  let atractionforce = 0;
  let repulsionforce = 100;
  let x, y;
  let n = [9];
  let d = [9];
  //print("---");
  for(let i = 0 ; i < nodes.length ; i++)
  {
    repulsionforce = 50;
    //print("---");
    //print("node " + i);
    //nodes[i].vely += gravity*deltatime;
    
    
    //add nodes colisions
    //check if see color, exept its own, find direction and bounce off
    //imgData = context.getImageData(nodes[i].posx-2, nodes[i].posy-2, 5, 5);
    /*
    5x5 grid
     0  4  8 12 16
    20 24 28 32 36
    40 44 48 52 56
    60 64 68 72 76
    80 84 88 92 96
    */
    
    /*
    if(imgData.data[51] > 60)
    {
      if(imgData.data[3] > 60)//top left
      {
        nodes[i].vely += repulsionforce*deltatime;
        nodes[i].velx += repulsionforce*deltatime;
      }
      if(imgData.data[19] > 60)//top right
      {
        nodes[i].vely += repulsionforce*deltatime;
        nodes[i].velx -= repulsionforce*deltatime;
      }
      
      if(imgData.data[83] > 60)//bottom left
      {
        nodes[i].vely -= repulsionforce*deltatime;
        nodes[i].velx += repulsionforce*deltatime;
      }
      
      if(imgData.data[99] > 60)//bottom right
      {
        nodes[i].vely -= repulsionforce*deltatime;
        nodes[i].velx -= repulsionforce*deltatime;
      }
    }
    */
    /*
    if(imgData.data[11] > 60)
      nodes[i].vely += repulsionforce*deltatime;
      
    if(imgData.data[91] > 60)
      nodes[i].vely -= repulsionforce*deltatime;
    
    if(imgData.data[43] > 60)
      nodes[i].velx += repulsionforce*deltatime;
      
    if(imgData.data[59] > 60)
      nodes[i].velx -= repulsionforce*deltatime;
     
    */ 
    //if(imgData.data[43] > 60 && imgData.data[59] > 60)
      //nodes[i].vely -= repulsionforce*deltatime;
    
    
    
    
    
    
    
    //air resisance
    //nodes[i].vely *= airresistance;
    //nodes[i].velx *= airresistance;
    
    /*
    repulsionforce*=2;
    if(nodes[i].posy > height-5) //bounce off bottom
    {
      //nodes[i].vely *= -1;
      //nodes[i].posy = height - (nodes[i].posy - height);
      nodes[i].vely -= repulsionforce*deltatime;
    }
    if(nodes[i].posy < 5) //bounce off top
    {
      //nodes[i].vely *= -1;
      //nodes[i].posy *= -1;
      nodes[i].vely += repulsionforce*deltatime;
    }
    if(nodes[i].posx < 5) //bounce off left
    {
      //nodes[i].velx *= -1;
      //nodes[i].posx *= -1;
      nodes[i].velx += repulsionforce*deltatime;
    }
    if(nodes[i].posx > width-5) //bounce off right
    {
      //nodes[i].velx *= -1;
      //nodes[i].posx = width - (nodes[i].posx - width);
      nodes[i].velx -= repulsionforce*deltatime;
    }
    */
    
    x = nodes[i].posx;
    y = nodes[i].posy;
    x1 = Math.floor(x / gridsize);
    y1 = Math.floor(y / gridsize);
    
    
    
    n[0] = (width/gridsize)*(y1-1) + (x1-1);
    n[1] = (width/gridsize)*(y1-1) + (x1);
    n[2] = (width/gridsize)*(y1-1) + (x1+1);
    n[3] = (width/gridsize)*(y1) + (x1-1);
    n[4] = (width/gridsize)*(y1) + (x1);
    n[5] = (width/gridsize)*(y1) + (x1+1);
    n[6] = (width/gridsize)*(y1+1) + (x1-1);
    n[7] = (width/gridsize)*(y1+1) + (x1);
    n[8] = (width/gridsize)*(y1+1) + (x1+1);
 
    if(x1 == 0)
    {
      n[0] = -1;
      n[3] = -1;
      n[6] = -1;
    }
    if(x1 == (width/gridsize)-1)
    {
      n[2] = -1;
      n[5] = -1;
      n[8] = -1;
    }
    if(y1 == 0)
    {
      n[0] = -1;
      n[1] = -1;
      n[2] = -1;
    }
    if(y1 == (height/gridsize)-1)
    {
      n[6] = -1;
      n[7] = -1;
      n[8] = -1;
    }
    
    print(x + " " + y);
    print(x1 + " " + y1);
    
    for(let i = 0 ; i < 9 ; i++)
    {
      d[i] = getdensity(n[i]);
      print(n[i]);
    }
      
      
    let min, minid;
    min = 0;
    minid = 0;
    for(let i = 1 ; i < 9 ; i++)
    {
      if(min < d[i] && d[i] >= 0)
      {
        min = d[i];
        minid = i;
      }
    }
    
    //n0 n1 n2
    //n3 n4 n5
    //n6 n7 n8
    
    switch (minid) {
      case '0':
        nodes[i].vely -= repulsionforce*deltatime;
        nodes[i].velx -= repulsionforce*deltatime;
        break;
      case '1':
        nodes[i].vely -= repulsionforce*deltatime;
        break;
      case '2':
        nodes[i].vely -= repulsionforce*deltatime;
        nodes[i].velx += repulsionforce*deltatime;
        break;
      case '3':
        
        nodes[i].velx -= repulsionforce*deltatime;
        break;
      case '4':
        
        
        break;
      case '5':
        
        nodes[i].velx += repulsionforce*deltatime;
        break;
      case '6':
        nodes[i].vely += repulsionforce*deltatime;
        nodes[i].velx -= repulsionforce*deltatime;
        break;
      case '7':
        nodes[i].vely += repulsionforce*deltatime;
        
        break;
      case '8':
        nodes[i].vely += repulsionforce*deltatime;
        nodes[i].velx += repulsionforce*deltatime;
        break;
      
    }
    
  }
  for(let i = 0 ; i < nodes.length ; i++)
  {
    nodes[i].posy += nodes[i].vely*deltatime;
    nodes[i].posx += nodes[i].velx*deltatime;
  }
    
  
  drawnodes();
}
function drawnodes()
{
  context.globalAlpha = 1;
  clearcanvas();
  context.globalAlpha = 0.2;
  drawborder();

  
  let x, y;
  for(let i = 0 ; i < nodes.length ; i++)
  {
    x = nodes[i].posx;
    y = nodes[i].posy;
    drawfill(x, y, "blue", 10);
  }
}
function clearcanvas()
{
  context.clearRect(0, 0, width, height);
}
async function animation()
{
  while(runanimation)
  {
    calculatevelocity();
    await sleep(0);
  }
}
function generatenodes(amount)
{
  let spacing = 15;
  for(let i = 0 ; i < Math.sqrt(amount) ; i++)
    for(let o = 0 ; o < Math.sqrt(amount) ; o++)
    {
      drawfill(i * spacing, o, "blue", 10);
      nodes.push({
        posx: i * spacing,
        posy: o * spacing,
        velx: (Math.random()-0.5)*10,
        vely: 0,
      });
    }
}
function b4()
{
  generatenodes(81);
}
function calculatedensity()
{
  let x, y;
  imgData = context.getImageData(0, 0, width, height);
  for(let i = 0 ; i < densitygrid.length ; i++)
  {
    x = densitygrid[i].posx;
    y = densitygrid[i].posy;
    densitygrid[i].density = imgData.data[x*y*4+3];
    print(densitygrid[i].density);
    //drawfill(densitygrid[i].posx, densitygrid[i].posy, "red", 1);
  }
}
function b5()
{
  //generatedensitygrid();
  calculatedensity();
}
function generatedensitygrid()
{
  //let gridsize = 10;
  for(let i = 0 ; i < width*height/gridsize/gridsize ; i++)
  {
    densitygrid.push({
      posx: ((i * gridsize) % width)+gridsize/2,
      posy: (Math.floor((i*gridsize) / width)*gridsize)+gridsize/2,
      density: 0,
    });
    //print(densitygrid[i].posx + " " + densitygrid[i].posy);
  }
  //print(width*height/gridsize/gridsize);
}
function getdensity(index)
{
  if(index == -1)return -1;
  else return densitygrid[index].density;
}







