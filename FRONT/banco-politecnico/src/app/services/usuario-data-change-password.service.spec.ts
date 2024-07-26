import { TestBed } from '@angular/core/testing';

import { UsuarioDataChangePasswordService } from './usuario-data-change-password.service';

describe('UsuarioDataChangePasswordService', () => {
  let service: UsuarioDataChangePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioDataChangePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
