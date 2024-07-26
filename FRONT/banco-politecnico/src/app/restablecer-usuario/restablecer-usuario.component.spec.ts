import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecerUsuarioComponent } from './restablecer-usuario.component';

describe('RestablecerUsuarioComponent', () => {
  let component: RestablecerUsuarioComponent;
  let fixture: ComponentFixture<RestablecerUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestablecerUsuarioComponent]
    });
    fixture = TestBed.createComponent(RestablecerUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
