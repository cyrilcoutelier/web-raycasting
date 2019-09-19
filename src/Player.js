


export default class Player {

  constructor({x, y, angle}) {
    this.x = x;
    this.y = y;
    this.horizontalAngle = angle;
  }

  getHorizontalAngle() {
    return this.horizontalAngle;
  }
}
