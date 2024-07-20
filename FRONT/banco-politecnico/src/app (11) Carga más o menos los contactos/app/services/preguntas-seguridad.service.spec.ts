import { TestBed } from '@angular/core/testing';

import { PreguntasSeguridadService } from './preguntas-seguridad.service';

describe('PreguntasSeguridadService', () => {
  let service: PreguntasSeguridadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntasSeguridadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
