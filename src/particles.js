// target frames per second
const FPS = 30;

function Field(canvas) {
    this.canvas = canvas;
    this.context2D = canvas.getContext('2d');
    this.particles = new Array();

    for (var i=0; i< 500; i++)
    {
	this.particles.push(new Particle(canvas.width, canvas.height));
    }
}

Field.prototype.draw = function()
{
    this.drawBackground();
    this.drawParticles();
}

Field.prototype.drawBackground = function()
{
    this.clearBackground();
    this.fillBackground('#000');
}

Field.prototype.clearBackground = function()
{
    this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Field.prototype.fillBackground = function(color)
{
    this.context2D.fillStyle = color;
    this.context2D.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

Field.prototype.drawParticles = function()
{
    var len = this.particles.length;
    for (var i=0; i<len; i++)
    {
	this.drawParticle(this.particles[i]);
    }
}

Field.prototype.drawParticle = function(particle) {
    particle.drawIt(this.context2D);
    particle.update();
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
    this.dx = Math.random()*8 - 4;
    this.dy = Math.random()*4 - 2;
    this.color = '#' + rand(16).toString(16) + '00';
    this.size = rand(10) + 10;
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
    ctx.fillStyle = this.color;
    var dist = (this.x < (this.w / 2)) ? this.x : (this.w - this.x)
    var size = this.size * (100 / dist);
    if (size > this.size) {
	size = this.size;
    }
    ctx.fillRect(Math.floor(this.x), Math.floor(this.y), size, size);
}

window.onload = init;

function init()
{
    canvas = document.getElementById('canvas');
    var autostart = window.location.hash === "#go";
    var field = new Field(canvas);
    var running = false;
    var runId;

    // draw once to have something to click
    field.draw();

    canvas.onclick = function () {
	if (running) {
	    clearInterval(runId);
	} else {
	    runId = setInterval(function() { field.draw() }, 1000 / FPS);
	}
	running = !running;
    }

    if (autostart) {
        canvas.onclick();
    }
}
