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

function setupcanvas()
{
  let canvas = document.getElementById('canvas');
  document.getElementById("canvas").style.display="block";
  canvas.width = width;
  canvas.height = height;

  context = canvas.getContext('2d', { willReadFrequently: true });
  //context.drawImage(image, 0, 0);
  pixeldata = context.getImageData(0, 0, canvas.width, canvas.height);
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
      velx: 0,
      vely: 0,
    });
  }
  
}
function drawfill(x, y, color, size)
{
  context.fillStyle = color;
  context.fillRect(x-size/2, y-size/2, size, size);
}
function getcolor(index)
{
  return pixeldata.data[index]*1000000 + pixeldata.data[index+1]*1000 + pixeldata.data[index+2];
}
function getcolorpixel(x, y)
{
  return getcolor((y * width + x) * 4);
}
function b2()
{
  runanimation = true;
  animation();
}
function inbounds(x, y, id)
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
function drawborder()
{
  context.strokeRect(0, 0, width, height);
}
function calculatevelocity()
{
  let deltatime = 0.1;
  let gravity = 9.81;
  let airresistance = 0;
  for(let i = 0 ; i < nodes.length ; i++)
  {
    nodes[i].vely += gravity*deltatime;
    nodes[i].posy += nodes[i].vely*deltatime;
    nodes[i].posx += nodes[i].velx*deltatime;
    if(nodes[i].posy > height) //bounce off bottom
    {
      nodes[i].vely *= -1;
      nodes[i].posy = height - (nodes[i].posy - height);
    }
  }
  
  drawnodes();
}
function drawnodes()
{
  clearcanvas();
  drawborder();
  
  let x, y;
  for(let i = 0 ; i < nodes.length ; i++)
  {
    x = nodes[i].posx;
    y =nodes[i].posy;
    drawfill(x, y, "blue", 10);
  }
}
function clearcanvas()
{
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);
}
async function animation()
{
  while(runanimation)
  {
    calculatevelocity();
    await sleep(0);
  }
}




