import { TestBed } from '@angular/core/testing';

import { CredencialesService } from './credenciales.service';

describe('CredencialesService', () => {
  let service: CredencialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredencialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
