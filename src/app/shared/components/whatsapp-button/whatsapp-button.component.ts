import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent implements OnInit {
  showBackToTop = false;

  constructor() { }

  ngOnInit(): void {
    this.onWindowScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showBackToTop = window.pageYOffset > 240;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
