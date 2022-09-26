import { TestBed } from '@angular/core/testing';

import { SiteSelectService } from './site-select.service';

describe('SiteSelectService', () => {
  let service: SiteSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
