import { Vector as V } from 'vanilla-vectors-3d';
import { config } from './Config'
//https://www.npmjs.com/package/vanilla-vectors-3d
export class Vector extends V {

  static random(mag = 2) {
    return (Math.random() * mag) - (mag / 2);
  }

  static randomVector() {
    var d = Vector.random();
    return new Vector(d, d, Vector.random());
  }


  
}