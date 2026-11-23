import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { personality } from 'src/testing/fixtures';
import { PersonalityHomeCardComponent } from './personality-home-card.component';

describe('PersonalityHomeCardComponent', () => {
  it('links to the personality page', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(PersonalityHomeCardComponent);
    fixture.componentRef.setInput('articleData', personality());
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('a')!.getAttribute('href')).toBe(
      '/nasa-lica/ana-strizic',
    );
    expect(el.querySelector('img')!.getAttribute('srcset')).toBe(
      'https://img.test/144.webp 175w, https://img.test/345.webp',
    );
  });
});
