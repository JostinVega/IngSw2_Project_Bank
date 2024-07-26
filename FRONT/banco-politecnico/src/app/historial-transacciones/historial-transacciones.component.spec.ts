import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTransaccionesComponent } from './historial-transacciones.component';

describe('HistorialTransaccionesComponent', () => {
  let component: HistorialTransaccionesComponent;
  let fixture: ComponentFixture<HistorialTransaccionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialTransaccionesComponent]
    });
    fixture = TestBed.createComponent(HistorialTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
