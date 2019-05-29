var x0 = 2000;
var y0 = 2000;
var x1 = 2000;
var y1 = 2000;
const sigma = 50;
const v_g = 2;
var amp1, amp2, amp;
var k = 0.4;
var omega = 0.5;
var check = 0;
var framecount1 = 0,framecount2 = 0;


function setup() {
  var canvas = createCanvas(500,400);
  background(0);
  frameRate(30);
  frameCount = 1000;
  kSlider = createSlider(0.1, 0.5, 0.3, 0.01);
  kSlider.position(250, 400);
  omegaSlider = createSlider(0.4, 1.2, 0.8, 0.01);
  omegaSlider.position(250, 420);
}

function draw() {

  if (frameCount < 7*30) {
  
  loadPixels();
  k = kSlider.value();
  omega = omegaSlider.value();
  draw_spheric_wave()
  
  updatePixels();
  }
  else {
	background(255);
	textSize(40);
	var noiseVal = noise(frameCount*0.01)
	textAlign(CENTER, CENTER);
	text('Click Here', 250, 200);
	fill(0, 0, 0, 255*noiseVal);
  }
}

function draw_spheric_wave() {
  for (var x = 0; x < width; x++) {
	for (var y = 0; y < height; y++) {
	  var index = (x + y * width) * 4;
	  spheric_wave(x, y);
	  pixels[index] = 255;
	  pixels[index + 1] = 0;
	  pixels[index + 2] = 0;
	  pixels[index + 3] = 255*amp ;
	}
  }
  framecount1 += 1;
  framecount2 += 1;
}

function spheric_wave(x, y) {
  var r = sqrt(pow((x - x0), 2) + pow((y - y0), 2));
  amp1 = exp(-pow((x - x0) / (2 * sigma), 2) - pow((y - y0) / (2 * sigma), 2)-pow((r - v_g * framecount1) / (2 * sigma), 2))* (1 + cos(k * r - omega * framecount1));;
  var r = sqrt(pow((x - x1), 2) + pow((y - y1), 2));
  amp2 = exp(-pow((x - x1) / (2 * sigma), 2) - pow((y - y1) / (2 * sigma), 2)-pow((r - v_g * framecount2) / (2 * sigma), 2))* (1 + cos(k * r - omega * framecount2));;
  amp = 1/4 * (amp1+amp2);
}

function mouseClicked() {
if (0<mouseX && mouseX<width &&0<mouseY && mouseY<height) {
	  if (check == 0) {
		x0 = mouseX;
		y0 = mouseY;
		check = 1;
		framecount1 = 0;
	  }
	  else {
		x1 = mouseX;
		y1 = mouseY;
		check = 0;
		framecount2 = 0;
	  }
	  frameCount = 0;
	}
}
