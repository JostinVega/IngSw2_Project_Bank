import { TestBed } from '@angular/core/testing';

import { ConfirmarCuentaService } from './confirmar-cuenta.service';

describe('ConfirmarCuentaService', () => {
  let service: ConfirmarCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmarCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
