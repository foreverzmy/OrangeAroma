import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

import { Star } from './start';

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
  public ctx;
  public stars = [];

  constructor(public elementRef: ElementRef) {
  }

  ngOnInit() {
    this.canvas = document.createElement('canvas');
    this.octx = this.canvasRef.nativeElement.getContext('2d');
    this.ctx = this.canvas.getContext('2d');
    this.canvasRef.nativeElement.width = window.innerWidth;
    this.canvasRef.nativeElement.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initAnimate();
    this.putValue();
  }

  initAnimate() {
    this.drawBg();  // 画背景
  }

  drawBg() {
    const maxRadius = 1.5;
    for (let i = 0; i < 100; i++) {
      const r = Math.random() * maxRadius;
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * 2 * this.canvas.height - this.canvas.height;
      const star = new Star(this.ctx, x, y, r);
      this.stars.push(star);
      star.paint();
    }
  }

  getimgData() {  // 获取canvas数据
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return imgData;
  }

  putValue() {  // 将canvas画在
    this.octx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const img = new Image();
    this.octx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height)
  }

}
