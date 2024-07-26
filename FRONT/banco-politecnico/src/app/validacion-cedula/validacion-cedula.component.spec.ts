import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionCedulaComponent } from './validacion-cedula.component';

describe('ValidacionCedulaComponent', () => {
  let component: ValidacionCedulaComponent;
  let fixture: ComponentFixture<ValidacionCedulaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidacionCedulaComponent]
    });
    fixture = TestBed.createComponent(ValidacionCedulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
