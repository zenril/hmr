import { Vector } from './Vector';
import { config } from './Config'
//https://www.npmjs.com/package/vanilla-vectors-3d
export class Boid {
  constructor() {
    this.position = new Vector(config.width / 2, config.height / 2 , config.depth / 2);
    this.velocity = Vector.randomVector();
    this.acceleration = new Vector(0,0,0);
  }

  update() {
    this.position = this.position.plus(this.velocity);
    this.velocity = this.velocity.plus(this.acceleration);
  }

  draw(p){

    p.strokeWeight(16);
    p.stroke(255);
    p.point(this.position.x, this.position.y);
  }
}