// 烟花和爆炸效果
export class Boom {
  public ctx: CanvasRenderingContext2D;
  public booms = [];
  public x: number;
  public y: number;
  public r: number;
  public c: string;
  public shape;
  public boomArea: { x, y };
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
    this.ba = Math.floor(getRandom(80, 200));
  }

  paint() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.c;
    this.ctx.fill();
    this.ctx.restore();
  }

  move() {  // 烟花移动
    const dx = this.boomArea.x - this.x;
    const dy = this.boomArea.y - this.y;
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

  drawLight() {  // 画出烟花轨迹的光晕
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

    const range = Math.floor(getRandom(300, 400));
    for (let i = 0; i < fragNum; i++) {
      if (style === 2) {
        color = {
          a: Math.floor(getRandom(128, 255)),
          b: Math.floor(getRandom(128, 255)),
          c: Math.floor(getRandom(128, 255)),
        }
      }
      const a = getRandom(-Math.PI, Math.PI);
      const x = getRandom(0, range) * Math.cos(a) + this.x;
      const y = getRandom(0, range) * Math.sin(a) + this.y;
      const radius = getRandom(0, 2);
      const frag = new Frag(this.ctx, this.x, this.y, radius, color, x, y);
      this.booms.push(frag);
    }
  }

}

class Frag {
  public ctx: CanvasRenderingContext2D;
  public tx;
  public ty;
  public x;
  public y;
  public dead = false;
  public centerX;
  public centerY;
  public radius;
  public color: { a, b, c };
  constructor(ctx, centerX, centerY, radius, color, tx, ty) {
    this.ctx = ctx;
    this.tx = tx;
    this.ty = ty;
    this.x = centerX;
    this.y = centerY;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.color = color;
  }

  paint() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = `rgba(${this.color.a},${this.color.b},${this.color.c},1)`;
    this.ctx.fill();
    this.ctx.restore();
  }

  moveTo(index) {
    this.ty = this.ty + 0.03;
    const dx = this.tx - this.x;
    const dy = this.ty - this.y;
    this.x = Math.abs(dx) < 0.1 ? this.tx : (this.x + dx * 0.1);
    this.y = Math.abs(dy) < 0.1 ? this.ty : (this.y + dy * 0.1);
    if (dx === 0 && Math.abs(dy) <= 80) {
      this.dead = true;
    }
    this.paint();
  }
}

export function getRandom(a: number, b: number): number {
  return Math.random() * (b - a) + a;
}
