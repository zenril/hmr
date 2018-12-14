import { Vector } from './Vector';
import { config } from './Config';
import { instance as flock } from './Flock';
//https://www.npmjs.com/package/vanilla-vectors-3d
export class Boid {
  constructor() {
    this.position = new Vector(
      Math.random() * config.width << 0,
      Math.random() * config.height << 0,
      config.depth / 2
    );
    this.velocity = Vector.random2D();
    this.acceleration = new Vector(0,0,0);

    this.maxForce = 0.2;
    this.maxSpeed = 6;
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



  movement() {
    let perceptionRadius = 24;
    var steering = {};
    steering.alignment = new Vector(0,0,0);
    steering.seperation = new Vector(0,0,0);
    steering.cohesion = new Vector(0,0,0);

    let total_alignment = 0;
    let total_seperation = 0;
    let total_cohesion = 0;



    for (let other of flock.boids) {
      let d = this.position.dist(other.position);

      //aliignment
      if (other != this && d < 25) {
        steering.alignment.add(other.velocity);
        total_alignment++;
      }

      //cohesion
      if (other != this && d < 50) {
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

  flock() {
    let steering = this.movement();

    steering.alignment.mult(1.5);
    steering.cohesion.mult(1);
    steering.seperation.mult(2);

    this.acceleration.add(steering.alignment);
    this.acceleration.add(steering.cohesion);
    this.acceleration.add(steering.seperation);
    
    
  }

  draw(p){
    p.strokeWeight(4);
    p.stroke(67,67,255);
    p.point(this.position.x, this.position.y);
  }
}