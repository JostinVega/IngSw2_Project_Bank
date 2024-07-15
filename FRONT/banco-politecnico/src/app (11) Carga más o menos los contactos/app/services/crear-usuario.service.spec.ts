import { TestBed } from '@angular/core/testing';

import { CrearUsuarioService } from './crear-usuario.service';

describe('CrearUsuarioService', () => {
  let service: CrearUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
