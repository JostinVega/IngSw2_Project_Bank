import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarCrearCuentaComponent } from './verificar-crear-cuenta.component';

describe('VerificarCrearCuentaComponent', () => {
  let component: VerificarCrearCuentaComponent;
  let fixture: ComponentFixture<VerificarCrearCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarCrearCuentaComponent]
    });
    fixture = TestBed.createComponent(VerificarCrearCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
