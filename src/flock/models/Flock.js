import Vector from 'vector-object';
import { config } from './Config'

export class Flock {
  constructor() {
    this.boids = [];
  }

  add (boid) {
    this.boids.push(boid);
  }

  draw(p){
    // p.strokeWeight(16);
    // p.stroke(255);
    // p.point(this.position.x, this.position.y);
  }
}

export const instance =  new Flock();