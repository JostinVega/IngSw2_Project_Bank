import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarUsuarioComponent } from './verificar-usuario.component';

describe('VerificarUsuarioComponent', () => {
  let component: VerificarUsuarioComponent;
  let fixture: ComponentFixture<VerificarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarUsuarioComponent]
    });
    fixture = TestBed.createComponent(VerificarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
