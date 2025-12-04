import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

// Fade-up para entradas suaves de blocos de conteúdo
export const fadeUp = trigger('fadeUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate('450ms 200ms cubic-bezier(0.16, 1, 0.3, 1)',
      style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

// Entrada lateral para áreas maiores (ex.: formulários)
export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(24px)' }),
    animate('520ms 200ms cubic-bezier(0.16, 1, 0.3, 1)',
      style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

// Stagger para listas/grade de itens
export const staggerFadeList = trigger('staggerFadeList', [
  transition(':enter', [
    query('.feature-item', [
      style({ opacity: 0, transform: 'translateY(12px)' }),
      stagger(200, animate('400ms ease-out',
        style({ opacity: 1, transform: 'translateY(0)' })))
    ], { optional: true })
  ])
]);

// Controle por estado para revelar textos/botões ao entrar no viewport, com leve subida
export const revealOnScroll = trigger('revealOnScroll', [
  transition('hidden => visible', [
    query('h2, p, a', [
      style({ opacity: 0, transform: 'translateY(18px)' }),
      stagger(120, animate('550ms 120ms cubic-bezier(0.16, 1, 0.3, 1)',
        style({ opacity: 1, transform: 'translateY(0)' })))
    ], { optional: true })
  ])
]);
