import P5 from 'p5';
import { config } from './models/Config';
import { Boid } from './models/Boid';
import { Flock } from './models/Flock';


var flock = new Flock();

var p5 = new P5(function(p) {

  p.setup = function(){
    p.createCanvas(
      config.width,
      config.height
    );
    
    for (let i = 0; i < 300; i++) {
      flock.add(new Boid());
    }
    
  }
  
  
  p.draw = function(){
    p.background(51);

    for (let boid of flock.boids) {
      boid.update();
      boid.draw(p);
    }
  }


});

console.log(p5.createVector());