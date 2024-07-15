import { TestBed } from '@angular/core/testing';

import { ConfirmarRegistroService } from './confirmar-registro.service';

describe('ConfirmarRegistroService', () => {
  let service: ConfirmarRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmarRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
