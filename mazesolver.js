let pixeldata;
let image;
let colorwall = 0;
let colorpath = 0;

function loadFile(event) 
{
	
  image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
}
function printpixeldata()
{
  for(let i = 0 ; i < pixeldata.data.length ; i+=4)
    console.log(pixeldata.data[i] + " " + pixeldata.data[i+1] + " " + pixeldata.data[i+2])
}
function solve()
{
  print("-----")
  console.log("width " + image.width);
  console.log("height " + image.height);
  let canvas = document.getElementById('canvas');
  //console.log(image.width);
  //console.log(image.height);
  canvas.width = image.width;
  canvas.height = image.height;

  let context = canvas.getContext('2d', willReadFrequently = true);
  context.drawImage(image, 0, 0);
  
  pixeldata = context.getImageData(0, 0, canvas.width, canvas.height);
  console.log("number of pixels " + pixeldata.data.length);
  //printpixeldata();
  
  findcolors();
  findexit();
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
  console.log("wall " + colorwall);
  console.log("path " + colorpath);
}
function findexit()
{
  let exit1x = -1, exit1y = -1, exit2x = -1, exit2y = -1;
  let width = image.width;
  let height = image.height;
  let color = 0;
  let path = false;
  for(let i = 0 ; i < width ; i++)//top side
  {
    color = getcolor(i*4);
    if(color == colorwall) path = false;
    if(color == colorpath && exit1y == -1)
    {
      exit1x = i;
      exit1y = 0;
      path = true;
    }
    if(color == colorpath && exit1y != -1 && !path)
    {
      exit2x = i;
      exit2y = 0;
      path = true;
    }
    //print(color);
    //print(path);
  }
  for(let i = 0 ; i < height ; i++)//right side
  {
    color = getcolor(i*width*4 + (width-1)*4);
    if(color == colorwall) path = false;
    if(color == colorpath && exit1y == -1)
    {
      exit1x = width-1;
      exit1y = i;
      path = true;
    }
    if(color == colorpath && exit1y != -1 && !path)
    {
      exit2x = width-1;
      exit2y = i;
      path = true;
    }
    //print(color);
    //print(path);
  }
  for(let i = 0 ; i < width ; i++)//bottom side
  {
    color = getcolor((width)*(height-1)*4 + i*4);
    if(color == colorwall) path = false;
    if(color == colorpath && exit1y == -1)
    {
      exit1x = i;
      exit1y = height-1;
      path = true;
    }
    if(color == colorpath && exit1y != -1 && !path)
    {
      exit2x = i;
      exit2y = height-1;
      path = true;
    }
    //print(color);
    //print(path);
  }
  for(let i = 0 ; i < height ; i++)//left side
  {
    color = getcolor(i*width*4);
    if(color == colorwall) path = false;
    if(color == colorpath && exit1y == -1)
    {
      exit1x = 0;
      exit1y = i;
      path = true;
    }
    if(color == colorpath && exit1y != -1 && !path)
    {
      exit2x = 0;
      exit2y = i;
      path = true;
    }
    //print(color);
    //print(path);
  }
  print("exit 1yx: " + exit1y + " " + exit1x);
  print("exit 2yx: " + exit2y + " " + exit2x);
}
function getcolor(index)
{
  return pixeldata.data[index]*1000000 + pixeldata.data[index+1]*1000 + pixeldata.data[index+2];
}
function print(text)
{
  console.log(text);
}

