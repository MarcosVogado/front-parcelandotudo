import { Component } from '@angular/core';
import { fadeUp, slideInRight, staggerFadeList } from '../../animations';

@Component({
  selector: 'app-consulta-veicular',
  templateUrl: './consulta-veicular.component.html',
  styleUrls: ['./consulta-veicular.component.scss'],
  animations: [fadeUp, slideInRight, staggerFadeList]
})
export class ConsultaVeicularComponent {
  badges = [
    { icon: 'fa-solid fa-database', label: 'Dados via Denatran/Serpro' },
    { icon: 'fa-solid fa-file-shield', label: 'Fonte oficial' },
    { icon: 'fa-solid fa-lock', label: 'Não armazenamos seu RENAVAM' },
  ];

  discoveries = [
    { icon: 'fa-solid fa-ticket', label: 'Multas' },
    { icon: 'fa-solid fa-receipt', label: 'Débitos IPVA' },
    { icon: 'fa-solid fa-ban', label: 'Restrições' },
    { icon: 'fa-solid fa-gavel', label: 'Leilão' },
    { icon: 'fa-solid fa-rotate-left', label: 'Recall' },
    { icon: 'fa-solid fa-id-card', label: 'Licenciamento' },
  ];
}
