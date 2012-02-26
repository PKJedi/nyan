/*
var example = document.getElementById('stars');
var context = example.getContext('2d');
context.fillStyle = "rgb(255,0,0)";
context.fillRect(30, 30, 50, 50);
*/
var height;
var width;
var t = 0;
var ctx;
var offset = 250;
var blockWidth = 80; // rainbow chunk width


var starcanvasDiv;

function createCanvasOverlay()
{
	// Create a blank div where we are going to put the canvas into.
	starcanvasDiv = document.createElement('div');
	
	// Add the div into the document
	document.body.appendChild(starcanvasDiv);
	starcanvasDiv.style.position="absolute";
	
	// Set to 100% so that it will have the dimensions of the document
	starcanvasDiv.style.left="0px";
	starcanvasDiv.style.top="0px";
	starcanvasDiv.style.overflow = 'hidden';
	starcanvasDiv.style.width="100%";
	starcanvasDiv.style.height="100%";
	// Set to high index so that this is always above everything else
	// (might need to be increased if you have other element at higher index)
	starcanvasDiv.style.zIndex="1000";
	
	// Now we create the canvas
	starcanvas = document.createElement('canvas');
	starcanvas.style.width = starcanvasDiv.scrollWidth+"px";
	starcanvas.style.height = starcanvasDiv.scrollHeight+"px";
	// You must set this otherwise the canvas will be streethed to fit the container
	starcanvas.width=starcanvasDiv.scrollWidth;
	starcanvas.height=starcanvasDiv.scrollHeight;
	
	starcanvas.style.overflow = 'visible';
	starcanvas.style.position = 'absolute';
	starcanvas.setAttribute('id','starcanvas');
	ctx = starcanvas.getContext("2d");
	// Add int into the container
	starcanvasDiv.appendChild(starcanvas);
}

var init = function() {
	width = starcanvas.width;
	height = starcanvas.height;
	//initStarField();
	//ctx.save();
	//anim1();
	
	ctx.fillStyle = "rgb(0,51,102)";
	ctx.clearRect(0,0, width,height);
	ctx.translate(width/2,height/2);
	ctx.save();
	ctx.fillRect(-width/2, -height/2, width, height);
	ctx.restore();	
	var starCount = 30;
	
	draw();
	
}

var root = this;

var cats = [];
function draw()
{
	//var cats = [];
	var stars = [];
	
	// Star conf
	function star() {
		this.frame = Math.floor(Math.random() * (4 - 0 + 1) + 0);
		this.tx = width*Math.random()-width/2;
		this.ty = height*Math.random()-height/2;
		this.life = 0;
	}
	for(var i=0; i<30; i++) stars.push(new star);
		
	// Rainbow conf
	
	// Kissa + sateenkaari	
	// Sateenkaari
	
	//var pubstate = (pubstate==0) ? 1 : 0; // seuraavan kaaren asento	
	this.kissa = function() {
	
		var pubstate = 0;
		this.cat = document.createElement('img');
		this.cat.style.width = 320+"px"; // 70% 320 (458)
		this.cat.style.height = 200+"px"; // 70% 200 (285)
		//cat.width=458;
		//cat.height=285;	
		this.cat.style.overflow = 'hidden';
		this.cat.style.position = 'absolute';
		this.cat.style.top = height/2-20;
		this.cat.style.left = -360; // -360;
		//this.cat.setAttribute('id','cat');
		this.cat.setAttribute('src','cat.gif');
		starcanvasDiv.appendChild(this.cat);
		
		var kissa = this;
		this.test = 5;
		
		this.touchBorder = false;
		
		this.xpos = 0;
		this.enabled = true;
		this.counter = -80;
		this.catX = -320; // -320;
		this.position = 0;// monesko sateenkaari ruudullla	
		this.rainbows = [];	
		
		this.rainBlock = function()
		{
			pubstate = (pubstate==0) ? 1 : 0;
			this.state = pubstate;			
			this.offset = kissa.position*blockWidth;
			this.framelimiter = 0;
			this.draw = 200;
			this.barHeight = 21;		
			kissa.position++;				
		}		
		
		
		this.updateRainbow = function()
		{
			//console.log(kissa.rainbows.length);
			for(var i=0; i<kissa.rainbows.length; i++)
			{				
				//console.log(kissa.rainbows.length);
				ctx.save();
				ctx.translate(-width/2, 0);	
				
				if (kissa.enabled == true) {
					//console.log(rainbows.length);					
					if ((kissa.rainbows[i].draw == 0) && (kissa.rainbows[i].barHeight > 0))
					{
						kissa.rainbows[i].barHeight -= 0.5;
					} else if (kissa.rainbows[i].draw > 0) {
						kissa.rainbows[i].draw--;
					} 
					

					if (kissa.rainbows[i].framelimiter >4) 
					{
						ctx.save();
						//ctx.fillStyle = "rgba(0,51,102,"+rainbows[i].draw+")";
						//ctx.fillStyle = "rgb(0,51,102)";
						ctx.fillRect(0+kissa.rainbows[i].offset,-1+(5*kissa.rainbows[i].state), blockWidth, 132);
						kissa.rainbows[i].state = (kissa.rainbows[i].state==0) ? 1 : 0;					
						kissa.rainbows[i].framelimiter = 0;
						ctx.restore();
					}	
					kissa.rainbows[i].framelimiter++;
					//console.log('raindraw '+i+' '+0+kissa.rainbows[i].offset);
					
					ctx.fillStyle = "rgb(255,0,0)";
					ctx.fillRect(0+kissa.rainbows[i].offset,0+(5*kissa.rainbows[i].state), blockWidth, kissa.rainbows[i].barHeight);
					ctx.fillStyle = "rgb(255,153,0)";
					ctx.fillRect(0+kissa.rainbows[i].offset,20+(5*kissa.rainbows[i].state), blockWidth, kissa.rainbows[i].barHeight);
					ctx.fillStyle = "rgb(255,255,0)";
					ctx.fillRect(0+kissa.rainbows[i].offset,40+(5*kissa.rainbows[i].state), blockWidth, kissa.rainbows[i].barHeight);
					ctx.fillStyle = "rgb(51,255,0)";
					ctx.fillRect(0+kissa.rainbows[i].offset,60+(5*kissa.rainbows[i].state), blockWidth, kissa.rainbows[i].barHeight);
					ctx.fillStyle = "rgb(0,153,255)";
					ctx.fillRect(0+kissa.rainbows[i].offset,80+(5*kissa.rainbows[i].state), blockWidth, kissa.rainbows[i].barHeight);		
					ctx.fillStyle = "rgb(102,51,255)";
					ctx.fillRect(0+kissa.rainbows[i].offset,100+(5*kissa.rainbows[i].state), blockWidth, kissa.rainbows[i].barHeight);	
					
				}
				ctx.restore();
			}
		}
		
		// Kissa
		this.updateCat = function()
		{
			this.rChunks = Math.round(window.width/blockWidth)+3;
			if (kissa.enabled==true) {
				kissa.counter+=4;
				kissa.catX+=4;		
				if ((kissa.counter > blockWidth) && (kissa.xpos < kissa.rChunks))
				{
					kissa.counter = 0;
					kissa.rainbows.push(new kissa.rainBlock());
					kissa.xpos++;	
					//console.log('new rainblock spawned');				
				}
				if (kissa.rainbows.length != this.rChunks) {
					this.cat.style.left = kissa.catX;
					//console.log(kissa.catX+' '+window.innerWidth);
					if ((kissa.catX >= window.innerWidth-319) && (kissa.touchBorder == false)) {
						// enabled = false;
						// bordertouch
						//cats.splice(0,1);
						socket.emit('next');
						kissa.touchBorder = true;
					}
					if (kissa.catX >= window.innerWidth) {
						//reset();					
						//resetbow();
					}
				}
			}
		}			
	}
	
	// End of kissa + sateenkaari
	// P‰‰luuppi
	setInterval(function() {
	
		// T‰hdet
		for(var i=0; i<stars.length; i++)
		{
			stars[i].life += 15;
			stars[i].xtmod = stars[i].tx-stars[i].life;
			if (stars[i].xtmod < -width/2-100) stars[i].tx += width+100+100*Math.random();			
			ctx.save();
			ctx.translate(stars[i].tx-stars[i].life, stars[i].ty);
			ctx.fillStyle = "rgb(0,51,102)";
			ctx.fillRect(-25,-25, 70, 52);
			ctx.fillStyle = "rgb(255,255,255)";	
			switch(stars[i].frame) {		
			case 0:
				ctx.fillRect(0,-6,5,5);
				ctx.fillRect(0,6,5,5);
				ctx.fillRect(-6,0,5,5);
				ctx.fillRect(6,0,5,5);		
				break;
			case 1:
				ctx.fillRect(0,-15,5,13);
				ctx.fillRect(0,7,5,13);
				ctx.fillRect(-2,0, -13,5);
				ctx.fillRect(7,0,13,5);	
				break;			
			case 2:
				ctx.fillRect(0,-20,5,13);
				ctx.fillRect(0,13,5,13);
				ctx.fillRect(-7,0, -13,5);
				ctx.fillRect(12,0,13,5);	
				ctx.fillRect(0,0,5,5);	
				break;				
			case 3:
				ctx.fillRect(0,-12,5,5);
				ctx.fillRect(0,12,5,5);
				ctx.fillRect(-12,0,5,5);
				ctx.fillRect(12,0,5,5);		
				break;			
				// 4th frame unknown
			case 4:
				ctx.fillRect(0,-12,5,5);
				ctx.fillRect(0,12,5,5);
				ctx.fillRect(-12,0,5,5);
				ctx.fillRect(12,0,5,5);		
				break;	
				
			default:
				ctx.fillRect(0,-7,5,5);
				ctx.fillRect(0,7,5,5);
				ctx.fillRect(-7,0,5,5);
				ctx.fillRect(7,0,5,5);			
				break;
			}
			ctx.restore();				
			if (stars[i].frame < 3)
			{
				stars[i].frame++;
			} else
			{
				stars[i].frame = 0;
			}
			
		} // T‰hdet loppuu	
	
		for(var i=0; i<cats.length; i++)
		{
			if (cats.length > 0) { 
				cats[i].updateRainbow();
				cats[i].updateCat();
				killCat();
			}
		}	
	}, 50);
}

var newCat = function()
{
	cats.push(new kissa());
}

var killCat = function()
{
	if (cats[0].rainbows.length > 0) {
		if (cats[0].rainbows[cats[0].rainbows.length-1].barHeight == 0)
		{
			//console.log('LOPPUI');
			//killCat();
			starcanvasDiv.removeChild(cats[0].cat);
			//ctx.fillRect(-width/2,-height/2, width,height);
			cats.splice(0,1);
		}
	}
}

/*
function resetall()
{
	console.log('derp');
	ctx.fillRect(-width/2,-height/2, width,height);
	rainbows = [];
	counter = -80;
	catX = -320;	
	xpos = 0;
	cat.style.left = catX;
	position = 0;
}
function resetbow()
{
	ctx.fillRect(-width/2,-height/2, width,height);
	enabled = false;
	//rainbows = [];
	//counter = -80;
	//catX = -320;	
	//xpos = 0;
	//cat.style.left = catX;
	//position = 0;
	
}
*/
createCanvasOverlay();
init();
socket.on('nyan', function() { newCat(); });
socket.emit('size', {w: window.innerWidth, h: window.innerHeight});
window.onresize = function() {
  socket.emit('size', {w: window.innerWidth, h: window.innerHeight});
};

socket.on('screens', function(data) {
  console.log(data);
  var elems = document.getElementsByClassName('screenContainer');
  if (elems.length) {
    document.body.removeChild(elems[0]);
  }

  var container = document.createElement('section');
  container.setAttribute('class', 'screenContainer');
  container.style.position = 'absolute';
  container.style.zIndex = '1001';
  
  for (var i in data.screens) {
    var screen = document.createElement('article');
    screen.style.width = data.screens[i].w / 10;
    screen.style.height = data.screens[i].h / 10;
    screen.style.backgroundColor = 'rgba(255,255,255,0.5)';
    screen.style.display = 'block';
    screen.style.float = 'left';
    screen.style.margin = '0 10px 0 0';

    if (parseInt(i, 10) === data.you) {
      screen.style.backgroundColor = 'rgba(255,255,255,0.7)';
    } else {
      screen.onclick = (function() {
        var pos = i;
        return function(e) {
          console.log('want to move to ' + pos);
          socket.emit('move', {to: pos});
        };
      }());
    }

    container.appendChild(screen);
  }

  document.body.appendChild(container);

});



















