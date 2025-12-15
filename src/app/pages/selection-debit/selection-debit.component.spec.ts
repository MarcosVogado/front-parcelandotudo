import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionDebitComponent } from './selection-debit.component';

describe('SelectionDebitComponent', () => {
  let component: SelectionDebitComponent;
  let fixture: ComponentFixture<SelectionDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectionDebitComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectionDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
