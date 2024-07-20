import { TestBed } from '@angular/core/testing';

import { UniqueNumberServiceService } from './unique-number-service.service';

describe('UniqueNumberServiceService', () => {
  let service: UniqueNumberServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueNumberServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
