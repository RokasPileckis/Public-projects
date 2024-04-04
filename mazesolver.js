let pixeldata;
let image;

function loadFile(event) {
	
  image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
}
function printpixeldata()
{
  console.log(pixeldata.data.length);
  for(let i = 0 ; i < pixeldata.data.length ; i+=4)
    console.log(pixeldata.data[i] + " " + pixeldata.data[i+1] + " " + pixeldata.data[i+2])
}
function solve()
{
  console.log(image.width);
  console.log(image.height);
  let canvas = document.getElementById('canvas');
  //console.log(image.width);
  //console.log(image.height);
  canvas.width = image.width;
  canvas.height = image.height;

  let context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);
  
  pixeldata = context.getImageData(0, 0, canvas.width, canvas.height);

  printpixeldata();
}


