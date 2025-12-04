import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-barcode-form',
  templateUrl: './barcode-form.component.html',
  styleUrls: ['./barcode-form.component.scss']
})
export class BarcodeFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      barcode: [
        '',
        [
          Validators.required,
          Validators.minLength(44),
          Validators.maxLength(48),
          Validators.pattern(/^\d+$/)
        ]
      ]
    });
  }

  consultBoleto(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const value = this.form.value.barcode;
    console.log('Consultando boleto para código:', value);
  }

  clearField(): void {
    this.form.reset();
    this.submitted = false;
  }

  onInputChange(): void {
    const current = this.form.get('barcode')?.value || '';
    const sanitized = current.replace(/[^\d]/g, '').slice(0, 48);
    if (sanitized !== current) {
      this.form.get('barcode')?.setValue(sanitized, { emitEvent: false });
    }
  }

  onBlur(): void {
    this.barcodeControl?.markAsTouched();
  }

  get barcodeControl() {
    return this.form.get('barcode');
  }

  get shouldShowErrors(): boolean {
    return this.submitted || !!this.barcodeControl?.touched;
  }
}
