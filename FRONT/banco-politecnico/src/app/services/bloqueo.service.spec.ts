import { TestBed } from '@angular/core/testing';

import { BloqueoService } from './bloqueo.service';

describe('BloqueoService', () => {
  let service: BloqueoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloqueoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
