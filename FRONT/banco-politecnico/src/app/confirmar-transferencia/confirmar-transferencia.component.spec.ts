import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarTransferenciaComponent } from './confirmar-transferencia.component';

describe('ConfirmarTransferenciaComponent', () => {
  let component: ConfirmarTransferenciaComponent;
  let fixture: ComponentFixture<ConfirmarTransferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarTransferenciaComponent]
    });
    fixture = TestBed.createComponent(ConfirmarTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
