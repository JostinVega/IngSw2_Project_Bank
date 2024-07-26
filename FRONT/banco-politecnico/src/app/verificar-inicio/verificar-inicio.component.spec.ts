import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarInicioComponent } from './verificar-inicio.component';

describe('VerificarInicioComponent', () => {
  let component: VerificarInicioComponent;
  let fixture: ComponentFixture<VerificarInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarInicioComponent]
    });
    fixture = TestBed.createComponent(VerificarInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
