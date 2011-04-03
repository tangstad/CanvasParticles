ParticleTest = TestCase("ParticleTest");

ParticleTest.prototype.testParticle = function() {
    var particle = new Particle(10, 10);
    assertEquals(10, particle.w);
    assertEquals(10, particle.h);
}

