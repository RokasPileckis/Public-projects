let pixeldata;
let context;
let posx = 0;
let posy = 0;
let keys = [];

function setupcanvas()
{
  let canvas = document.getElementById('canvas');
  document.getElementById("canvas").style.display="block";
  canvas.width = 300;
  canvas.height = 200;

  context = canvas.getContext('2d', { willReadFrequently: true });
  //context.drawImage(image, 0, 0);
  pixeldata = context.getImageData(0, 0, canvas.width, canvas.height);
  print("setup")
}
function drawpixel(x, y, color)
{
  context.fillStyle = "red";
  context.fillRect(x, y, 1, 1);
}
async function draw()
{
  for(let x = 0 ; x < canvas.width ; x++)
  {
    for(let y = 0 ; y < canvas.height ; y++)
    {
      drawpixel(x, y, "red");
    }
    await sleep(1);
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
  keys[event.key] = true;
  //print(keys[event.key]);
  //print(event.key);
  keypresed();
});
document.addEventListener("keyup", function onPress(event) 
{
  keys[event.key] = false;
  keypresed();
});
function keypresed()
{
  //print("keypresed");
  print(keys.lengh);
  for(let i = 0 ; i < keys.lengh ; i++)
  {
    if(keys[i])print(i);
    
    print(keys[i]);
    
  }
  
  //print(key);
  if(keys[39])if(posx < canvas.width)posx++;
  if(keys[37])if(posx > 0)posx--;
  if(keys[38])if(posy > 0)posy--;
  if(keys[40])if(posy < canvas.height)posy++;
  
  
  drawpixel(posx, posy);
}






