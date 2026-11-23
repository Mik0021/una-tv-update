import { HttpEventType, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha-2';
import { of } from 'rxjs';
import { NavService } from 'src/app/services/nav.service';
import { QuizApplyComponent } from './quiz-apply.component';

describe('QuizApplyComponent', () => {
  let fixture: ComponentFixture<QuizApplyComponent>;
  let component: QuizApplyComponent;
  let http: HttpTestingController;
  const quizEnabled = signal<boolean | undefined>(true);
  const text = () => (fixture.nativeElement as HTMLElement).textContent!;

  beforeEach(async () => {
    quizEnabled.set(true);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: NavService, useValue: { quizEnabled } },
        {
          provide: ReCaptchaV3Service,
          useValue: { execute: () => of('recaptcha-token') },
        },
      ],
    });
    fixture = TestBed.createComponent(QuizApplyComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  const selectFile = async (file: File) => {
    component.onFileSelected({ target: { files: [file] } } as unknown as Event);
    await fixture.whenStable();
  };

  it('shows validation errors instead of submitting an empty form', async () => {
    (fixture.nativeElement as HTMLElement)
      .querySelector<HTMLButtonElement>('button[type=submit]')!
      .click();
    await fixture.whenStable();
    expect(text()).toContain('Molimo Vas popunite sva polja u formi!');
  });

  it('rejects files that are not MP4', async () => {
    await selectFile(new File(['x'], 'clip.mov', { type: 'video/quicktime' }));
    expect(text()).toContain('Dozvoljeni tip fajla je .mp4');
    expect(component.video.value).toBeNull();
  });

  it('uploads with progress and confirms success', async () => {
    component.quizForm.patchValue({
      name: 'Pera Perić',
      dob: '1990-01-01',
      place_of_residence: 'Beograd',
      occupation: 'Tester',
      already_participated: '0',
      phone: '0601234567',
      email: 'pera@example.com',
      agreed_to_audition_rules: true,
      agreed_with_the_processing_of_personal_data: true,
    });
    await selectFile(new File(['x'], 'clip.mp4', { type: 'video/mp4' }));

    component.submit();
    const req = http.expectOne((r) => r.url.endsWith('/quiz-request.php'));
    expect(req.request.reportProgress).toBe(true);
    expect((req.request.body as FormData).get('recaptcha_response')).toBe(
      'recaptcha-token',
    );

    req.event({ type: HttpEventType.UploadProgress, loaded: 40, total: 100 });
    await fixture.whenStable();
    expect(text()).toContain('40 %');

    req.flush({}, { status: 201, statusText: 'Created' });
    await fixture.whenStable();
    expect(text()).toContain('Uspesno ste se prijavili.');
    expect(component.quizForm.enabled).toBe(true);
  });

  it('leaves the page when the quiz is closed', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate');
    quizEnabled.set(false);
    await fixture.whenStable();
    expect(navigate).toHaveBeenCalledWith(['/']);
  });
});
