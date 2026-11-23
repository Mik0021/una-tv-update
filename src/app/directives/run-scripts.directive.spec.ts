import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { RunScriptsDirective } from './run-scripts.directive';

@Component({
  template: `<div appRunScripts [innerHTML]="html | safeHtml"></div>`,
  imports: [RunScriptsDirective, SafeHtmlPipe],
})
class HostComponent {
  html =
    '<div class="raw-html-embed"><blockquote>tweet</blockquote>' +
    '<script async src="https://platform.twitter.com/widgets.js"></script></div>';
}

describe('RunScriptsDirective', () => {
  // Global from the Brid.tv script; Angular's teardown calls it after afterEach.
  const destroyPlayer = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    (globalThis as any).destroyPlayer = destroyPlayer;
    destroyPlayer.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('re-inserts the Twitter widget script so it runs again', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const original = el.querySelector('script')!;

    vi.runAllTimers();

    const current = el.querySelector('script')!;
    expect(current).not.toBe(original);
    expect(current.src).toBe('https://platform.twitter.com/widgets.js');
    expect(current.async).toBe(true);
  });

  it('destroys the Brid player when the content goes away', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    fixture.destroy();
    expect(destroyPlayer).toHaveBeenCalled();
  });
});
