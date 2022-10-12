import { TestBed } from '@angular/core/testing';

import { PersonalitiesService } from './personalities.service';

describe('PersonalitiesService', () => {
  let service: PersonalitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
