import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { personality } from 'src/testing/fixtures';
import { PersonalityCardComponent } from './personality-card.component';

describe('PersonalityCardComponent', () => {
  it('shows the personality and links relative to the current route (/nasa-lica)', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(PersonalityCardComponent);
    fixture.componentRef.setInput('articleData', personality());
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h2')!.textContent!.trim()).toBe('Ana Strizić');
    expect(el.querySelector('a')!.getAttribute('href')).toBe('/ana-strizic');
    expect(el.querySelector('img')!.getAttribute('srcset')).toBe(
      'https://img.test/710.webp 175w, https://img.test/944.webp',
    );
  });
});
