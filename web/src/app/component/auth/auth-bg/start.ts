export class Star {
  public x;
  public y;
  public r;
  public ctx: CanvasRenderingContext2D;
  constructor(ctx, x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ctx = ctx;
  }

  paint() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI); this.ctx.fillStyle = 'rgba(255,255,255,' + this.r + ')';
    this.ctx.fill();
    this.ctx.restore();
  }

}
