import { DatePipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
} from '@angular/core';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { TvProgram } from './../../interfaces/tv-program.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, DatePipe, SafeHtmlPipe],
})
export class TableComponent {
  readonly schema = input.required<TvProgram>();

  /** Selected day; back to the first day whenever a new schedule arrives. */
  protected readonly activeTab = linkedSignal({
    source: this.schema,
    computation: () => 0,
  });

  protected toggleAccordion(event: Event) {
    const row = (event.target as HTMLElement).parentElement!;
    row.classList.toggle('active-acc');
    const panel = row.nextElementSibling?.querySelector<HTMLElement>('.panel');
    if (!panel) {
      return;
    }
    panel.style.maxHeight = panel.style.maxHeight
      ? ''
      : panel.scrollHeight + 'px';
  }
}
