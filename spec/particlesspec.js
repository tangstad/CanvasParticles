describe('Particle', function() {
    it('holds width and height', function() {
	var particle = new Particle(10, 20);
	expect(particle.w).toEqual(10);
	expect(particle.h).toEqual(20);
    });

    it('can draw itself as a red box to the canvas', function() {
	var particle = new Particle(10, 20);
	var Context = function() {};
	var drawn = false;
	Context.prototype.fillRect = function() {
	    drawn = true;
	};
	var ctx = new Context();

	particle.drawIt(ctx);

	expect(ctx.fillStyle).toMatch('#[0-9a-f]00');
	expect(drawn).toBeTruthy();
    });
});
