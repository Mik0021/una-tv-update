import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Nav } from 'src/app/interfaces/nav.model';
import { nav } from 'src/testing/fixtures';
import { NavService } from '../services/nav.service';
import { HeaderComponent } from './header.component';

@Component({ template: '' })
class EmptyPage {}

describe('HeaderComponent', () => {
  const menu = signal<Nav | undefined>(undefined);

  const render = () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: '**', component: EmptyPage }]),
        { provide: NavService, useValue: { nav: menu } },
      ],
    });
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    return fixture;
  };
  const links = (el: HTMLElement) =>
    [...el.querySelectorAll('nav a')].map((a) => a.textContent!.trim());

  beforeEach(() => menu.set(undefined));

  it('renders the menu once it loads, with submenus', async () => {
    const fixture = render();
    const el = fixture.nativeElement as HTMLElement;
    expect(links(el)).not.toContain('Naš program');

    menu.set(nav(false));
    await fixture.whenStable();

    expect(links(el)).toContain('Naš program');
    expect(links(el)).toContain('Emisije');
    expect(links(el)).not.toContain('Una kviz');
  });

  it('shows the quiz link when the quiz is enabled', async () => {
    menu.set(nav(true));
    const fixture = render();
    await fixture.whenStable();
    expect(links(fixture.nativeElement)).toContain('Una kviz');
  });

  it('opens and closes the mobile menu', async () => {
    menu.set(nav(false));
    const fixture = render();
    const el = fixture.nativeElement as HTMLElement;
    const menuEl = () => el.querySelector('nav')!;
    expect(menuEl().classList).toContain('-translate-x-full');

    el.querySelector<HTMLButtonElement>('button.ml-3')!.click();
    await fixture.whenStable();
    expect(menuEl().classList).not.toContain('-translate-x-full');

    el.querySelector<HTMLAnchorElement>('nav li a')!.click();
    await fixture.whenStable();
    expect(menuEl().classList).toContain('-translate-x-full');
  });
});
