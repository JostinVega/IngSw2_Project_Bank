import { TestBed } from '@angular/core/testing';

import { InformacionRegistroService } from './informacion-registro.service';

describe('InformacionRegistroService', () => {
  let service: InformacionRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
