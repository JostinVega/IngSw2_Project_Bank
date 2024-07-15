import { TestBed } from '@angular/core/testing';

import { TipoCuentaService } from './tipo-cuenta.service';

describe('TipoCuentaService', () => {
  let service: TipoCuentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCuentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
