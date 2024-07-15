import { TestBed } from '@angular/core/testing';

import { PasswordServiceService } from './password.service.service';

describe('PasswordServiceService', () => {
  let service: PasswordServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
