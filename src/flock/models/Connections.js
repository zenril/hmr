export class Connections {
  constructor() {
    //this.connections = {}; 
    this.reset();
  }

  reset() {
    this.connections = {};
  }

  add (b1, b2) {
    var min = Math.min(b1.id, b2.id);
    var max = Math.max(b1.id, b2.id);
    this.connections[min + "-" + max] = [
      b1.position,
      b2.position
    ];
  }

  draw(p){
    for (var key in this.connections) {
      if (this.connections.hasOwnProperty(key)) {
        var pos = this.connections[key];
        let d = pos[0].dist(pos[1]);
        if(d > 50 || d < 5){
          continue;
        }

        p.push();
        p.line(pos[0].x, pos[0].y, pos[1].x, pos[1].y);
        p.pop();
      }
    }
  }
}

export const instance =  new Connections();