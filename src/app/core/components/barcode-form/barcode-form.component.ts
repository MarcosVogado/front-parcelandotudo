import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { badgeStagger } from '../../../animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-barcode-form',
  templateUrl: './barcode-form.component.html',
  styleUrls: ['./barcode-form.component.scss'],
  animations: [badgeStagger]
})
export class BarcodeFormComponent implements OnInit, AfterViewInit, OnDestroy {
  form!: FormGroup;
  submitted = false;
  badgesVisible = false;
  private badgesObserver?: IntersectionObserver;

  @ViewChild('badgeSentinel', { static: true }) badgeSentinel!: ElementRef<HTMLElement>;

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

  ngAfterViewInit(): void {
    this.badgesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.badgesVisible = true;
          this.badgesObserver?.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    this.badgesObserver.observe(this.badgeSentinel.nativeElement);
  }

  ngOnDestroy(): void {
    this.badgesObserver?.disconnect();
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

  get barcodeControl(): AbstractControl {
    return this.form.get('barcode') as AbstractControl;
  }

  get shouldShowErrors(): boolean {
    return this.submitted || !!this.barcodeControl?.touched;
  }
}
