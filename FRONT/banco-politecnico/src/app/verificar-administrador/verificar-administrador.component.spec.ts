import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarAdministradorComponent } from './verificar-administrador.component';

describe('VerificarAdministradorComponent', () => {
  let component: VerificarAdministradorComponent;
  let fixture: ComponentFixture<VerificarAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarAdministradorComponent]
    });
    fixture = TestBed.createComponent(VerificarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
