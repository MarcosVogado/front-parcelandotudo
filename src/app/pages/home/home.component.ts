import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fadeUp, revealOnScroll, slideInRight, staggerFadeList } from '../../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeUp,
    slideInRight,
    staggerFadeList,
    revealOnScroll,
  ]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedAmount = 0;
  private targetAmount = 20000000;
  private animationDuration = 2000; // ms
  aboutVisible = false;
  private intersectionObserver?: IntersectionObserver;

  @ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
    this.animateAmount();
  }

  ngAfterViewInit(): void {
    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.aboutVisible = true;
          this.intersectionObserver?.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    this.intersectionObserver.observe(this.aboutSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
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
