import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PartialMatchRouteSnapshot, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { subcategoryGuard } from './subcategory.guard';
import { provideHttpClient } from '@angular/common/http';

describe('subcategoryGuard', () => {
  let http: HttpTestingController;

  const run = (path: string) =>
    runInInjectionContext(TestBed.inject(EnvironmentInjector), () =>
      subcategoryGuard(
        {} as Route,
        [new UrlSegment('cat', {}), new UrlSegment(path, {})],
        {} as PartialMatchRouteSnapshot,
      ),
    ) as Observable<boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('matches when the API says the segment is a subcategory', async () => {
    run('sub').subscribe((v) => {
      expect(v).toBe(true);
    });
    http.expectOne((r) => r.url.endsWith('/sub')).flush(true);
  });

  it('does not match when the API says false', async () => {
    run('post').subscribe((v) => {
      expect(v).toBe(false);
    });
    http.expectOne((r) => r.url.endsWith('/post')).flush(false);
  });

  it('does not match when the API call fails', async () => {
    run('x').subscribe((v) => {
      expect(v).toBe(false);
    });
    http
      .expectOne((r) => r.url.endsWith('/x'))
      .flush('', { status: 500, statusText: 'err' });
  });
});
