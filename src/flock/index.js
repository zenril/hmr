import P5 from 'p5';
import { config } from './models/Config';
import { Boid } from './models/Boid';
import { instance as flock } from './models/Flock';

var p5 = new P5(function(p) {

  p.setup = function(){
    // console.log(p5.Vector.random3D());

    config.width = p.windowWidth;
    config.height = p.windowHeight;
    
    p.createCanvas(
      config.width,
      config.height
    );

    //p.noCanvas();

    for (let i = 0; i < 300; i++) {
      flock.add(new Boid());
    }

  }

  p.windowResized = function() {
    config.width = p.windowWidth;
    config.height = p.windowHeight;
    p.resizeCanvas(config.width, config.height);    
  }

  p.draw = function(){
    p.background(51);

    for (let boid of flock.boids) {
      boid.edges();
      boid.flock();
      boid.update();
      boid.draw(p);
    }
  }

});

console.log(p5.createVector());