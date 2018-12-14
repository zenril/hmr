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
    this.maxSpeed = 5;
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

  align() {
    var  perceptionRadius = 25;
    var  steering = new Vector(0,0,0);
    var total = 0;
    for (let other of flock.boids) {
      let d = this.position.dist(other.position);
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation() {
    let perceptionRadius = 24;
    let steering = new Vector(0,0,0);
    let total = 0;
    for (let other of flock.boids) {
      let d = this.position.dist(other.position);
      if (other != this && d < perceptionRadius) {
        let diff = Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius = 50;
    let steering = new Vector(0,0,0);
    let total = 0;
    for (let other of flock.boids) {
      let d = this.position.dist(other.position);
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
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
    let alignment = this.align();
    let cohesion = this.cohesion();
    let separation = this.separation();

    alignment.mult(1.5);
    cohesion.mult(1);
    separation.mult(2);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  draw(p){
    p.strokeWeight(16);
    p.stroke(255);
    p.point(this.position.x, this.position.y);
  }
}