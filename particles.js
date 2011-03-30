// target frames per second
const FPS = 30;

function Field(canvas) {
    this.canvas = canvas;
    this.context2D = canvas.getContext('2d');
    this.particles = new Array();

    for (var i=0; i< 1000; i++)
    {
	this.particles.push(new Particle(canvas.width, canvas.height));
    }
}

Field.prototype.draw = function()
{
    this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context2D.fillStyle = '#000';
    this.context2D.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context2D.fillStyle = '#fff';

    var len = this.particles.length;
    for (var i=0; i<len; i++)
    {
	this.particles[i].drawIt(this.context2D);
	this.particles[i].update();
    }
}

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
    ctx.fillRect(this.x, this.y, 3, 3);
}

window.onload = init;

function init()
{
    canvas = document.getElementById('canvas');
    var field = new Field(canvas);
    var draw = function() {
	field.draw();
    }
    setInterval(function() { field.draw() }, 1000 / FPS);
}
