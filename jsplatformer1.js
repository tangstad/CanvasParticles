// target frames per second
const FPS = 30;
var canvas = null;
var context2D = null;
var particles = new Array();

// will return 0 to range-1
var rand = function(range) {
	return Math.floor(Math.random()*range);
}

function Particle(w, h) {
	this.w = w;
	this.h = h;
	this.x = rand(w);
	this.y = rand(h);
	this.dx = Math.random()*4 - 2;
	this.dy = Math.random()*4 - 2;
}

Particle.prototype.update = function() {
	this.x = this.x + this.dx;
	if (this.x > this.w) {
		this.x = this.x - this.w;
	}
	else if (this.x < 0)
	{
		this.x += this.w;
  }
	
	this.y = this.y + this.dy;
	if (this.y > this.h) {
		this.y = this.y - this.h;
	}
	else if (this.y < 0)
	{
		this.y += this.h;
	}
}

Particle.prototype.drawIt = function(ctx) {
	ctx.fillRect(this.x, this.y, 2, 2);
}

window.onload = init;

function init()
{
	canvas = document.getElementById('canvas');
	context2D = canvas.getContext('2d');
	for (var i=0; i< 10000; i++)
	{
		particles.push(new Particle(600, 400));
	}
	setInterval(draw, 1000 / FPS);
}

function draw()
{
	context2D.clearRect(0, 0, canvas.width, canvas.height);
	context2D.fillStyle = '#000';
	context2D.fillRect(0, 0, canvas.width, canvas.height);
	context2D.fillStyle = '#fff';

	var len = particles.length;
	for (var i=0; i<len; i++)
	{
		particles[i].drawIt(context2D);
		particles[i].update();
	}
}
