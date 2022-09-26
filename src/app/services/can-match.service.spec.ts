import { TestBed } from '@angular/core/testing';

import { CanMatchService } from './can-match.service';

describe('CanMatchService', () => {
  let service: CanMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
