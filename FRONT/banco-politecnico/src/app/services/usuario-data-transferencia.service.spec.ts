import { TestBed } from '@angular/core/testing';

import { UsuarioDataTransferenciaService } from './usuario-data-transferencia.service';

describe('UsuarioDataTransferenciaService', () => {
  let service: UsuarioDataTransferenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioDataTransferenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
