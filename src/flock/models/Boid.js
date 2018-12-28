import { Vector } from './Vector';
import { config } from './Config';
import { instance as flock } from './Flock';
import { instance as connections } from './Connections';
import  {Point, Circle, Rectangle, QuadTree} from './QuadTree';
//https://www.npmjs.com/package/vanilla-vectors-3d
export class Boid {

  constructor(id) {
    this.id = id;
    this.position = new Vector(
      Math.random() * config.width << 0,
      Math.random() * config.height << 0,
      config.depth / 2
    );

    this.count = 0;

    this.lastPosition = new Vector(
      this.position.x,
      this.position.y,
      this.position.z
    );

    this.path = [];
    
    this.velocity = Vector.random2D();
    this.acceleration = new Vector(0,0,0);

    this.maxForce = 0.1;
    this.maxSpeed = 3;//(2 + Math.random() * 18) << 0;
    this.heading = 0;
  }

  edges() {
    if (this.position.x > config.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = config.width;
    }
    if (this.position.y > config.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = config.height;
    }
  }



  movement(p) {
    let perceptionRadius = 24;
    var steering = {};
    steering.alignment = new Vector(0,0,0);
    steering.seperation = new Vector(0,0,0);
    steering.cohesion = new Vector(0,0,0);
    

    let total_alignment = 0;
    let total_seperation = 0;
    let total_cohesion = 0;


    var boids = config.quadTree.findInRadius(new Circle({
      x: this.position.x,
      y: this.position.y,
      r: 30
    }));

    for (let ref of boids) {

      

      var other = ref.data.ref;
      
      if(other == this){
        continue;
      }
      
      connections.add(this, other);

      // //p.push();
      // if(p.dist(this.position.x, this.position.y, other.position.x, other.position.y) < 60){
      //   // p.push();
      //   // p.line(this.position.x, this.position.y, other.position.x, other.position.y);
      //   // p.pop();
      // }
      // /p.pop();

      let d = this.position.dist(other.position);

      //aliignment
      if (other != this && d < 25) {
        steering.alignment.add(other.velocity);
        total_alignment++;
      }

      //cohesion
      if (other != this && d < 29) {
        

        let diff = Vector.sub(this.position, other.position);
        steering.cohesion.add(other.position);
        total_cohesion++;
      }

      //seperation
      if (other != this && d < 24) {
        let diff = Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.seperation.add(diff);
        total_seperation++;
      }
    }


    if (total_alignment > 0) {
      steering.alignment.div(total_alignment);
      steering.alignment.setMag(this.maxSpeed);
      steering.alignment.sub(this.velocity);
      steering.alignment.limit(this.maxForce);
    }

    if (total_cohesion > 0) {
      steering.cohesion.div(total_cohesion);
      steering.cohesion.sub(this.position);
      steering.cohesion.setMag(this.maxSpeed);
      steering.cohesion.sub(this.velocity);
      steering.cohesion.limit(this.maxForce);
    }

    if (total_seperation > 0) {
      steering.seperation.div(total_seperation);
      steering.seperation.setMag(this.maxSpeed);
      steering.seperation.sub(this.velocity);
      steering.seperation.limit(this.maxForce);
    }

    return steering;
  }

  
  update() {
   

    
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  flock(p) {

    //  if(++this.count%5 == 0 ){
    
      

    this.path.unshift([{
        x: this.position.x,
        y: this.position.y
      },{
        x: this.lastPosition.x,
        y: this.lastPosition.y
      }
    ]);

    if(this.path.length > 8) {
      this.path.pop();
    }

    this.lastPosition.set(this.position);
  // }


   
    

    let steering = this.movement(p);

    steering.alignment.mult(1.5);
    steering.cohesion.mult(0.7);
    steering.seperation.mult(1.2);

    this.acceleration.add(steering.alignment);
    this.acceleration.add(steering.cohesion);
    this.acceleration.add(steering.seperation);
    
    
  }

  draw(p){
    
    
    p.strokeWeight(1);
    p.stroke(67,67,255);

    // p.push();
    

    // p.translate(this.position.x, this.position.y);


    

    // p.rotate(Math.atan2(this.position.x - last.x, this.position.y - last.y) * 180 / Math.PI - 90 % 360);
    // //console.log(this.position.angleBetween(this.lastPosition))
    // p.line(0,0, 8,-2);
    // p.line(8,-2, 8, 2);
    // p.line(8,2,0,0);

    

    // p.pop();

    // p.push();
    
 
    

    // var last = this.path[0][1];
    // var first = this.path[this.path.length - 1 ][0];
    // p.ellipse(first.x, first.y, 5);
    // p.fill(0);
    // p.ellipse(last.x, last.y, 5);
    // //for(var line of this.path) {

      
    //   // if(p.dist(line[0].x,line[0].y,line[1].x, line[1].y) < 60){
    //   //   p.line(line[0].x,line[0].y,line[1].x, line[1].y);
    //   // }
    // //}

    // p.pop();


    // p.point(this.position.x, this.position.y);
  }
}