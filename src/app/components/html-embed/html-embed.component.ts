import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RunScriptsDirective } from '../../directives/run-scripts.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

/**
 * Renders trusted HTML from the API (Brid.tv players, Twitter embeds, ...) and
 * re-runs its <script> tags in the browser.
 *
 * Third-party scripts rewrite this DOM, so it can't be hydrated: the host
 * carries `ngSkipHydration` and the block is re-rendered on the client while
 * the rest of the page hydrates. The host uses `display: contents`, so the
 * inner element (which gets `contentClass`) lays out exactly like the old
 * `<div [innerHTML] appRunScripts>`.
 */
@Component({
  selector: 'app-html-embed',
  template: `<div
    [ngClass]="contentClass()"
    [innerHTML]="html() | safeHtml"
    appRunScripts
  ></div>`,
  styles: ':host { display: contents; }',
  host: { ngSkipHydration: 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, RunScriptsDirective, SafeHtmlPipe],
})
export class HtmlEmbedComponent {
  readonly html = input('');
  readonly contentClass = input<NgClass['ngClass']>('');
}
