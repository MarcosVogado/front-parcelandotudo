import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SelectionDebitComponent } from './selection-debit.component';
import { ZorroModule } from '../../shared/zorro.module';

describe('SelectionDebitComponent', () => {
  let component: SelectionDebitComponent;
  let fixture: ComponentFixture<SelectionDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectionDebitComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, ZorroModule]
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
