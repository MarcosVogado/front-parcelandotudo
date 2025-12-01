import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barcode-form',
  templateUrl: './barcode-form.component.html',
  styleUrls: ['./barcode-form.component.scss']
})
export class BarcodeFormComponent implements OnInit {
  barcodeValue: string = '';

  constructor() { }

  ngOnInit(): void { }

  consultBoleto(): void {
    // Lógica de consulta do boleto (ex: validação) poderia ser implementada aqui.
    // Por enquanto, apenas um placeholder sem ação de backend.
    console.log('Consultando boleto para código:', this.barcodeValue);
  }

  clearField(): void {
    this.barcodeValue = '';
  }
}
