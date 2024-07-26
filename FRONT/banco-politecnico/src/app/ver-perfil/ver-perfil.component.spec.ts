import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPerfilComponent } from './ver-perfil.component';

describe('VerPerfilComponent', () => {
  let component: VerPerfilComponent;
  let fixture: ComponentFixture<VerPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPerfilComponent]
    });
    fixture = TestBed.createComponent(VerPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
