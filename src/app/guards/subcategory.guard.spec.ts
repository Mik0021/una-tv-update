import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { subcategoryGuard } from './subcategory.guard';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';

describe('subcategoryGuard', () => {
  let http: HttpTestingController;

  const run = (path: string) =>
    runInInjectionContext(TestBed.inject(EnvironmentInjector), () =>
      subcategoryGuard({} as Route, [new UrlSegment('cat', {}), new UrlSegment(path, {})])
    ) as Observable<boolean>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('matches when the API says the segment is a subcategory', (done) => {
    run('sub').subscribe((v) => {
      expect(v).toBeTrue();
      done();
    });
    http.expectOne((r) => r.url.endsWith('/sub')).flush(true);
  });

  it('does not match when the API says false', (done) => {
    run('post').subscribe((v) => {
      expect(v).toBeFalse();
      done();
    });
    http.expectOne((r) => r.url.endsWith('/post')).flush(false);
  });

  it('does not match when the API call fails', (done) => {
    run('x').subscribe((v) => {
      expect(v).toBeFalse();
      done();
    });
    http.expectOne((r) => r.url.endsWith('/x')).flush('', { status: 500, statusText: 'err' });
  });
});
