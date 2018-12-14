import { constants } from '../config/Constants';
export class Vector {

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  totaloString() {
    return 'Vector Object : [' + this.x + ', ' + this.y + ', ' + this.z + ']';
  };

  set(x, y, z) {
    if (x instanceof Vector) {
      this.x = x.x || 0;
      this.y = x.y || 0;
      this.z = x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      this.z = x[2] || 0;
      return this;
    }
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    return this;
  };

  copy() {
    return new Vector(this.x, this.y, this.z);
  };

  add(x, y, z) {
    if (x instanceof Vector) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      this.z += x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      this.z += x[2] || 0;
      return this;
    }
    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    return this;
  };

  sub(x, y, z) {
    if (x instanceof Vector) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      this.z -= x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      this.z -= x[2] || 0;
      return this;
    }
    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    return this;
  };

  mult(n) {
    if (!(typeof n === 'number' && isFinite(n))) {
      console.warn(
        'Vector.prototype.mult:',
        'n is undefined or not a finite number'
      );
      return this;
    }
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  };

  div(n) {
    if (!(typeof n === 'number' && isFinite(n))) {
      console.warn(
        'Vector.prototype.div:',
        'n is undefined or not a finite number'
      );
      return this;
    }
    if (n === 0) {
      console.warn('Vector.prototype.div:', 'divide by 0');
      return this;
    }
    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  };

  mag() {
    return Math.sqrt(this.magSq());
  };

  magSq() {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    return x * x + y * y + z * z;
  };

  dot(x, y, z) {
    if (x instanceof Vector) {
      return this.dot(x.x, x.y, x.z);
    }
    return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
  };

  cross(v) {
    var x = this.y * v.z - this.z * v.y;
    var y = this.z * v.x - this.x * v.z;
    var z = this.x * v.y - this.y * v.x;
    return new Vector(x, y, z);
  };

  dist(v) {
    return v
      .copy()
      .sub(this)
      .mag();
  };

  normalize() {
    var len = this.mag();

    if (len !== 0) this.mult(1 / len);
    return this;
  };

  limit(max) {
    var mSq = this.magSq();
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq))
        .mult(max);
    }
    return this;
  };

  setMag(n) {
    return this.normalize().mult(n);
  };

  heading() {
    var h = Math.atan2(this.y, this.x);
    return h;
  };

  rotate(a) {
    var newHeading = this.heading() + a;
    var mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  };

  angleBetween(v) {
    var dotmagmag = this.dot(v) / (this.mag() * v.mag());

    var angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
    return angle;
  };

  lerp(x, y, z, amt) {
    if (x instanceof Vector) {
      return this.lerp(x.x, x.y, x.z, y);
    }
    this.x += (x - this.x) * amt || 0;
    this.y += (y - this.y) * amt || 0;
    this.z += (z - this.z) * amt || 0;
    return this;
  };

  array() {
    return [this.x || 0, this.y || 0, this.z || 0];
  };

  equals(x, y, z) {
    var a, b, c;
    if (x instanceof Vector) {
      a = x.x || 0;
      b = x.y || 0;
      c = x.z || 0;
    } else if (x instanceof Array) {
      a = x[0] || 0;
      b = x[1] || 0;
      c = x[2] || 0;
    } else {
      a = x || 0;
      b = y || 0;
      c = z || 0;
    }
    return this.x === a && this.y === b && this.z === c;
  };

  static fromAngle(angle, length) {
    if (typeof length === 'undefined') {
      length = 1;
    }
    return new Vector(length * Math.cos(angle), length * Math.sin(angle), 0);
  };

  static(theta, phi, length) {
    if (typeof length === 'undefined') {
      length = 1;
    }
    var cosPhi = Math.cos(phi);
    var sinPhi = Math.sin(phi);
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);

    return new Vector(
      length * sinTheta * sinPhi,
      -length * cosTheta,
      length * sinTheta * cosPhi
    );
  };

  static random2D() {
    return this.fromAngle(Math.random() * constants.TWO_PI);
  };

  static random3D() {
    var angle = Math.random() * constants.TWO_PI;
    var vz = Math.random() * 2 - 1;
    var vzBase = Math.sqrt(1 - vz * vz);
    var vx = vzBase * Math.cos(angle);
    var vy = vzBase * Math.sin(angle);
    return new Vector(vx, vy, vz);
  };

  static add(v1, v2, target) {
    if (!target) {
      target = v1.copy();
    } else {
      target.set(v1);
    }
    target.add(v2);
    return target;
  };

  static sub(v1, v2, target) {
    if (!target) {
      target = v1.copy();
    } else {
      target.set(v1);
    }
    target.sub(v2);
    return target;
  };

  static mult(v, n, target) {
    if (!target) {
      target = v.copy();
    } else {
      target.set(v);
    }
    target.mult(n);
    return target;
  };

  static div(v, n, target) {
    if (!target) {
      target = v.copy();
    } else {
      target.set(v);
    }
    target.div(n);
    return target;
  };

  static dot(v1, v2) {
    return v1.dot(v2);
  };

  static cross(v1, v2) {
    return v1.cross(v2);
  };

  static dist(v1, v2) {
    return v1.dist(v2);
  };

  static lerp(v1, v2, amt, target) {
    if (!target) {
      target = v1.copy();
    } else {
      target.set(v1);
    }
    target.lerp(v2, amt);
    return target;
  };

  static mag(vecT) {
    var x = vecT.x,
      y = vecT.y,
      z = vecT.z;
    var magSq = x * x + y * y + z * z;
    return Math.sqrt(magSq);
  };
}
