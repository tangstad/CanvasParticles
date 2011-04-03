describe('Particle', function() {
    it('holds width and height', function() {
	var particle = new Particle(10, 20);
	expect(particle.w).toEqual(10);
	expect(particle.h).toEqual(20);
    });
});
