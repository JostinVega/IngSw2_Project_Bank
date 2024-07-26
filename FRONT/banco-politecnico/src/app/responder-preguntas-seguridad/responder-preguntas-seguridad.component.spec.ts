import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderPreguntasSeguridadComponent } from './responder-preguntas-seguridad.component';

describe('ResponderPreguntasSeguridadComponent', () => {
  let component: ResponderPreguntasSeguridadComponent;
  let fixture: ComponentFixture<ResponderPreguntasSeguridadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponderPreguntasSeguridadComponent]
    });
    fixture = TestBed.createComponent(ResponderPreguntasSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
