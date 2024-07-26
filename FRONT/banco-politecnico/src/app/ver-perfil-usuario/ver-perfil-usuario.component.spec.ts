import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPerfilUsuarioComponent } from './ver-perfil-usuario.component';

describe('VerPerfilUsuarioComponent', () => {
  let component: VerPerfilUsuarioComponent;
  let fixture: ComponentFixture<VerPerfilUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPerfilUsuarioComponent]
    });
    fixture = TestBed.createComponent(VerPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
