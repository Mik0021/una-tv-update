import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';
import { image, tvShow } from 'src/testing/fixtures';
import { environment } from 'src/environments/environment';
import { PersonalitySingleComponent } from './personality-single.component';

describe('PersonalitySingleComponent', () => {
  let fixture: ComponentFixture<PersonalitySingleComponent>;
  let http: HttpTestingController;
  const personalityUrl = `${environment.API_UNA}${environment.API_PERSNALITY}/ana-strizic`;
  const showsUrl = `${environment.API_UNA}${environment.API_PERSONALITY_SHOWS}/ana-strizic`;

  beforeEach(() => {
    // Defined by src/assets/brid.js in the app; called when embeds are destroyed.
    (globalThis as any).destroyPlayer = () => {};
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PersonalitySingleComponent);
    fixture.componentRef.setInput('personality', 'ana-strizic');
    fixture.detectChanges();
  });

  it('shows the personality, their shows and sets the title', async () => {
    http.expectOne(personalityUrl).flush({
      success: true,
      data: {
        resource_type: 'tv_personality',
        id: 1,
        name: 'Ana Strizić',
        sub_title: 'Voditeljka',
        slug: 'ana-strizic',
        description: '<p>Biografija</p>',
        image: image(),
      },
    });
    http.expectOne(showsUrl).flush({
      success: true,
      data: { tv_shows: [tvShow()] },
      paginator: {},
    });
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h1')!.textContent!.trim()).toBe('Ana Strizić');
    expect(el.querySelectorAll('app-card-small-content-down').length).toBe(1);
    expect(TestBed.inject(Title).getTitle()).toBe('Ana Strizić');
  });

  it('shows the not-found page when the personality does not exist', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate');
    http
      .expectOne(personalityUrl)
      .flush(null, { status: 404, statusText: 'Not Found' });
    http
      .expectOne(showsUrl)
      .flush(null, { status: 404, statusText: 'Not Found' });
    await fixture.whenStable();
    expect(navigate).toHaveBeenCalledWith(['404'], {
      skipLocationChange: true,
    });
  });
});
