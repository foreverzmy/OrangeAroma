export class Star {
  public ctx: CanvasRenderingContext2D;
  public x;
  public y;
  public r;
  constructor(ctx, x, y, r) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
  }

  paint() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI); this.ctx.fillStyle = 'rgba(255,255,255,' + this.r + ')';
    this.ctx.fill();
    this.ctx.restore();
  }

}
