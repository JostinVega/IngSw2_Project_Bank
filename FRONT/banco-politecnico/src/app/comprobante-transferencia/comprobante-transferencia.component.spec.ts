import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteTransferenciaComponent } from './comprobante-transferencia.component';

describe('ComprobanteTransferenciaComponent', () => {
  let component: ComprobanteTransferenciaComponent;
  let fixture: ComponentFixture<ComprobanteTransferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComprobanteTransferenciaComponent]
    });
    fixture = TestBed.createComponent(ComprobanteTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
