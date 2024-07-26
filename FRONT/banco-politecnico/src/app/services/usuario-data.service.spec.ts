import { TestBed } from '@angular/core/testing';

import { UsuarioDataService } from './usuario-data.service';

describe('UsuarioDataService', () => {
  let service: UsuarioDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
