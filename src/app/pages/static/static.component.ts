import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { lastValue, notFoundOnError } from '../../utils/resource';
import { StaticService } from './../../services/static.service';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticComponent {
  /** Route param `:static`. */
  readonly slug = input<string>(undefined, { alias: 'static' });

  private readonly resource = inject(StaticService).page(this.slug);
  protected readonly page = lastValue(this.resource);

  constructor() {
    notFoundOnError(this.resource);
    const seo = inject(SeoService);
    effect(() => {
      const page = this.page()?.data;
      if (page) {
        seo.set({ title: page.title, description: '', keywords: '' });
      }
    });
  }
}
