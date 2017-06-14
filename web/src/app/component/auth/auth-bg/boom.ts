// 烟花和爆炸效果
export class Boom {
  public ctx: CanvasRenderingContext2D;
  public booms = [];
  public x: number;
  public y: number;
  public r: number;
  public c: string;
  public shape;
  public boomArea;
  public theta = 0;
  public dead = false;
  public ba: number;
  constructor(ctx, x, r, c, height, boomArea, shape = false) {
    this.ctx = ctx;
    this.x = x;
    this.y = height + r;
    this.r = r;
    this.c = c;
    this.boomArea = boomArea;
    this.shape = shape;
    this.ba = Math.floor(getRandom(80, 200))
  }
  paint() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.c;
    this.ctx.fill();
    this.ctx.restore();
  }

  move() {
    const dx = this.boomArea - this.x;
    const dy = this.boomArea - this.y;
    this.x = this.x + dx * 0.01;
    this.y = this.y + dy * 0.01;
    if (Math.abs(dx) <= this.ba && Math.abs(dy) <= this.ba) {
      //   if (this.shape) {
      //     this.shapBoom();
      //   } else {
      this.boom();
      //   }
      this.dead = true;
    } else {
      this.paint();
    }
  }

  drawLight() {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(255,228,150,0.3)';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.restore();
  }

  boom() {
    const fragNum = getRandom(30, 200);
    const style = getRandom(0, 10) >= 5 ? 1 : 2;
    let color;
    if (style === 1) {
      color = {
        a: Math.floor(getRandom(128, 255)),
        b: Math.floor(getRandom(128, 255)),
        c: Math.floor(getRandom(128, 255)),
      }
    }


  }

  shapBoom() {

  }

}

export function getRandom(a: number, b: number): number {
  return Math.random() * (b - a) + a;
}
