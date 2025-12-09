import { Component } from '@angular/core';
import { fadeUp, slideInRight, staggerFadeList } from '../../animations';

@Component({
  selector: 'app-consulta-veicular',
  templateUrl: './consulta-veicular.component.html',
  styleUrls: ['./consulta-veicular.component.scss'],
  animations: [fadeUp, slideInRight, staggerFadeList]
})
export class ConsultaVeicularComponent {
  discoveries = [
    { icon: 'fa-solid fa-ticket', label: 'Multas', detail: 'Pendentes e em aberto' },
    { icon: 'fa-solid fa-receipt', label: 'Débitos IPVA', detail: 'Inclui anos em aberto' },
    { icon: 'fa-solid fa-id-card', label: 'Licenciamento', detail: 'Taxa e atrasos' },
    { icon: 'fa-solid fa-ban', label: 'Restrições financeiras', detail: 'Bloqueios e gravames' },
    { icon: 'fa-solid fa-file-invoice-dollar', label: 'Taxas em aberto', detail: 'Demais débitos do veículo' },
  ];

  highlights = [
    { icon: 'fa-solid fa-shield', title: 'Dados Oficiais', desc: 'Informações direto da base do DETRAN' },
    { icon: 'fa-solid fa-stopwatch', title: 'Consulta Rápida', desc: 'Resultado em poucos segundos' },
    { icon: 'fa-solid fa-file-lines', title: 'Histórico Completo', desc: 'Multas, débitos e restrições' },
    { icon: 'fa-solid fa-lock', title: '100% Seguro', desc: 'Seus dados protegidos' },
  ];

  stats = [
    { icon: 'fa-solid fa-people-group', value: '+120k', label: 'veículos consultados' },
    { icon: 'fa-regular fa-star', value: '4.9', label: 'avaliação média' },
    { icon: 'fa-solid fa-arrow-trend-up', value: '98%', label: 'satisfação' },
  ];

  testimonials = [
    {
      initials: 'CM',
      name: 'Carlos M.',
      location: 'São Paulo, SP',
      quote: 'Consegui parcelar o IPVA atrasado em 12x. Muito prático!'
    },
    {
      initials: 'AS',
      name: 'Ana Paula S.',
      location: 'Rio de Janeiro, RJ',
      quote: 'Descobri multas que nem sabia que tinha. Site confiável.'
    },
    {
      initials: 'RF',
      name: 'Roberto F.',
      location: 'Belo Horizonte, MG',
      quote: 'Atendimento rápido e informações precisas. Recomendo!'
    }
  ];

  sources = ['DENATRAN', 'SERPRO', 'DETRAN'];

  steps = [
    {
      step: 'Passo 01',
      title: 'Consulte seu veículo',
      desc: 'Digite o RENAVAM do seu veículo para iniciar a consulta. É rápido e fácil!',
      icon: 'fa-solid fa-magnifying-glass'
    },
    {
      step: 'Passo 02',
      title: 'Acesse as informações',
      desc: 'Visualize os débitos do veículo: pendências, multas e restrições.',
      icon: 'fa-solid fa-file-lines'
    },
    {
      step: 'Passo 03',
      title: 'Parcele em até 18x',
      desc: 'Quite as pendências do veículo com pagamento seguro e parcelado.',
      icon: 'fa-solid fa-credit-card'
    }
  ];

  faqs = [
    {
      question: 'O que é o RENAVAM?',
      answer: 'O RENAVAM (Registro Nacional de Veículos Automotores) é um código único, normalmente com 11 dígitos, que funciona como o "CPF" do veículo e reúne o histórico e a situação atual.'
    },
    { question: 'Onde encontro o RENAVAM do meu veículo?', answer: 'No CRLV/CRV (documento do veículo) ou em apps do Detran do seu estado.' },
    { question: 'As informações são atualizadas?', answer: 'Sim, consultamos bases oficiais (Denatran/Serpro/Detran) em tempo real.' },
    { question: 'A consulta é gratuita?', answer: 'A verificação de débitos é gratuita; você só paga se optar por quitar/parcelar.' },
    { question: 'É seguro fazer pagamentos pelo site?', answer: 'Usamos ambiente seguro, criptografia e não armazenamos o RENAVAM.' },
    { question: 'Posso parcelar multas e IPVA atrasado?', answer: 'Sim, após a consulta você pode parcelar multas, IPVA e taxas pendentes.' }
  ];

  openFaqIndex: number | null = 0;

  toggleFaq(idx: number): void {
    this.openFaqIndex = this.openFaqIndex === idx ? null : idx;
  }
}
