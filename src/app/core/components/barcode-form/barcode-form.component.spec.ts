import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeFormComponent } from './barcode-form.component';

describe('BarcodeFormComponent', () => {
  let component: BarcodeFormComponent;
  let fixture: ComponentFixture<BarcodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarcodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
