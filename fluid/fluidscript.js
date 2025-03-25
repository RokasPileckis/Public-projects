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
  //print("click: " + x + " " + y);
  
  if(inbounds(x, y, "canvas"))
  {
    x = event.offsetX;
    y = event.offsetY;
    //print("in bounds");
    drawfill(x, y, "blue", 10);
    nodes.push({
      posx: x,
      posy: y,
      velx: (Math.random()-0.5)*10,
      vely: 0,
    });
    //print("---");
    //let pixel = 220;
    //let imgData = context.getImageData(x-5, y-5, 10, 10);
    //let imgData = context.getImageData(x, y, 1, 1);
    //print(imgData.data[3]);
    
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
  //print("---");
  for(let i = 0 ; i < nodes.length ; i++)
  {
    //print("---");
    //print("node " + i);
    nodes[i].vely += gravity*deltatime;
    nodes[i].posy += nodes[i].vely*deltatime;
    nodes[i].posx += nodes[i].velx*deltatime;
    
    //add nodes colisions
    //check if see color, exept its own, find direction and bounce off
    imgData = context.getImageData(nodes[i].posx-2, nodes[i].posy-2, 5, 5);
    /*
    5x5 grid
     0  4  8 12 16
    20 24 28 32 36
    40 44 48 52 56
    60 64 68 72 76
    80 84 88 92 96
    */
    
    
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
    
    //air resisance
    nodes[i].vely *= airresistance;
    nodes[i].velx *= airresistance;
    
    
    
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
  
}



