import P5 from 'p5';
import { config } from './models/Config';
import { Boid } from './models/Boid';
import { instance as flock } from './models/Flock';
import { instance as connections } from './models/Connections';
import  {Point, Circle, Rectangle, QuadTree} from './models/QuadTree';

var p5 = new P5(function(p) {

  p.setup = function(){
    // console.log(p5.Vector.random3D());
    p.frameRate(30)
    config.width = p.windowWidth;
    config.height = p.windowHeight;

    p.createCanvas(
      config.width,
      config.height
    );

    //p.noCanvas();

    for (let i = 0; i < 600; i++) {
      flock.add(new Boid(i));
    }

  }

  p.windowResized = function() {
    config.width = p.windowWidth;
    config.height = p.windowHeight;
    p.resizeCanvas(config.width, config.height);    
  }

  p.draw = function(){

    connections.reset();

    config.quadTree = new QuadTree(new Rectangle(
      config.width / 2, config.height / 2, //x,y center
      config.width, 
      config.height  //w,h
    ), 4);

    for (let boid of flock.boids) {
      config.quadTree.insert(
        new Point({ x: boid.position.x, y: boid.position.y}, {ref : boid})
      );
    }
    


    p.background(255);

    for (let boid of flock.boids) {
      boid.edges();
      boid.flock(p);
      boid.update();
      //boid.draw(p);
    }
  
    connections.draw(p);

  }


});
