import { TestBed } from '@angular/core/testing';

import { UsuarioDataCrearCuentaService } from './usuario-data-crear-cuenta.service';

describe('UsuarioDataCrearCuentaService', () => {
  let service: UsuarioDataCrearCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioDataCrearCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
