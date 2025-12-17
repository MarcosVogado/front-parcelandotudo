import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillLookupComponent } from './bill-lookup.component';

describe('BillLookupComponent', () => {
  let component: BillLookupComponent;
  let fixture: ComponentFixture<BillLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillLookupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
