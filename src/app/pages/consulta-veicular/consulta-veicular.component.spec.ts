import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVeicularComponent } from './consulta-veicular.component';

describe('ConsultaVeicularComponent', () => {
  let component: ConsultaVeicularComponent;
  let fixture: ComponentFixture<ConsultaVeicularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaVeicularComponent]
    });
    fixture = TestBed.createComponent(ConsultaVeicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
