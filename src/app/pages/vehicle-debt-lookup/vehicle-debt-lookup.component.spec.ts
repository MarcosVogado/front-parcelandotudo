import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDebtLookupComponent } from './vehicle-debt-lookup.component';

describe('VehicleDebtLookupComponent', () => {
  let component: VehicleDebtLookupComponent;
  let fixture: ComponentFixture<VehicleDebtLookupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleDebtLookupComponent]
    });
    fixture = TestBed.createComponent(VehicleDebtLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
