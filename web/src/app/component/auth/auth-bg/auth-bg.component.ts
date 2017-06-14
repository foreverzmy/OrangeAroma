import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

import { Star } from './start';
import { Boom, getRandom } from './boom';

@Component({
  selector: 'app-auth-bg',
  templateUrl: './auth-bg.component.html',
  styleUrls: ['./auth-bg.component.css']
})
export class AuthBgComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  public bigbooms = [];
  public octx: CanvasRenderingContext2D;
  public canvas;
  public ctx: CanvasRenderingContext2D;
  public stars = [];
  public lastTime: number = new Date().getTime();

  constructor(public elementRef: ElementRef) { }

  ngOnInit() {
    this.canvas = document.createElement('canvas');
    this.octx = this.canvasRef.nativeElement.getContext('2d');
    this.ctx = this.canvas.getContext('2d');
    this.canvasRef.nativeElement.width = window.innerWidth;
    this.canvasRef.nativeElement.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initAnimate();
    this.drawBg();
  }

  initAnimate() {
    this.animate();
    requestAnimationFrame(this.initAnimate.bind(this));
  }

  drawBg() { // 画背景
    const maxRadius = 1.5;
    for (let i = 0; i < 100; i++) {
      const r = Math.random() * maxRadius;
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * 2 * this.canvas.height - this.canvas.height;
      const star = new Star(this.ctx, x, y, r);
      this.stars.push(star);
    }
  }

  drawMoon() {  // 画出月亮及月晕
    const centerX = this.canvas.width - 200;
    const centerY = 100;
    const diameter = 80;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(centerX + diameter / 2, centerY + diameter / 2, diameter / 2, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'rgba(251,192,76,1)';
    this.ctx.fill();
    this.ctx.restore();
    for (let i = 0; i < 10; i++) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(centerX + diameter / 2, centerY + diameter / 2, diameter / 2 + 2 * i, 0, 2 * Math.PI);
      this.ctx.fillStyle = 'rgba(240,219,120,0.05)';
      this.ctx.fill();
      this.ctx.restore()
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(0,5,24,0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();

    const newTime = new Date().getTime();
    if (newTime - this.lastTime > 500 + (window.innerHeight - 767) / 2) {
      // const random = Math.random() * 100 > 2 ? true : false;
      const x = getRandom(this.canvas.width / 5, this.canvas.width * 4 / 5);
      const y = getRandom(50, 200);
      // if (random === true) {
      const bigBoom = new Boom(
        this.ctx,
        getRandom(this.canvas.width / 3, this.canvas.width * 2 / 3), 2,
        '#FFF',
        this.canvas.height,
        { x: x, y: y }
      );
      this.bigbooms.push(bigBoom);
      // } else {
      //   const bigBoom = new Boom(
      //     this.ctx,
      //     getRandom(this.canvas.width / 3, this.canvas.width * 2 / 3), 2,
      //     '#FFF',
      //     this.canvas.height,
      //     { x: this.canvas.width / 2, y: 200 }
      //   )
      // }

      this.lastTime = newTime;
    }

    this.stars.forEach(star => {
      star.paint();
    });

    this.drawMoon();

    this.bigbooms.forEach(val => {
      if (val.dead === false) {
        val.move();
        val.drawLight();
      }
    })

    this.putValue();
  }

  putValue() {  // 将canvas画在画布上
    this.octx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.octx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height);
  }

}
