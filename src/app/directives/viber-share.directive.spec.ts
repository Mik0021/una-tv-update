import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ViberShareDirective } from './viber-share.directive';

@Component({
  template: `<a appViberShare>Viber</a>`,
  imports: [ViberShareDirective],
})
class HostComponent {}

describe('ViberShareDirective', () => {
  it('points the link at a Viber forward of the current page', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const link = (fixture.nativeElement as HTMLElement).querySelector('a')!;
    expect(link.getAttribute('href')).toBe(
      'viber://forward?text=' + encodeURIComponent(window.location.href),
    );
  });
});
