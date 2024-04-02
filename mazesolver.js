let pixeldata;

function loadFile = function(event) {
	//var image = document.getElementById('output');
	let image.src = URL.createObjectURL(event.target.files[0]);
  let canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  let context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);
  
  pixeldata = context.getImageData(0, 0, canvas.width, canvas.height);

  printpixeldata();
}
function printpixeldata()
{
  for(let i = 0 ; i < pixeldata.length ; i++)
    console.log(pixeldata.data[i])
}
