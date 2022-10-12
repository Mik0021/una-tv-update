import { TestBed } from '@angular/core/testing';

import { TvProgramService } from './tv-program.service';

describe('TvProgramService', () => {
  let service: TvProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
