import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedAmount = 0;
  private targetAmount = 20000000;
  private animationDuration = 2500; // ms

  constructor() { }

  ngOnInit(): void {
    this.animateAmount();
  }

  private animateAmount(): void {
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / this.animationDuration, 1);
      // Easing cúbico para entrada suave
      const eased = 1 - Math.pow(1 - progress, 3);
      this.displayedAmount = Math.floor(this.targetAmount * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
