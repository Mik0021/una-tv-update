import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SeoService } from 'src/app/services/seo.service';
import { CardSmallContentDownComponent } from '../../components/card-small-content-down/card-small-content-down.component';
import { goToPage, pageParam } from '../../utils/paging';
import { lastValue } from '../../utils/resource';
import { SearchService } from './../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardSmallContentDownComponent, NgxPaginationModule],
})
export class SearchComponent {
  private router = inject(Router);

  /** Query params `q` and `p`. */
  readonly q = input<string>();
  readonly p = input(1, { transform: pageParam });

  private readonly results = inject(SearchService).search(this.q, this.p);
  /** Previous results stay visible while the next page/query loads. */
  protected readonly data = lastValue(this.results);
  /** The API rejects some queries (e.g. fewer than 3 characters). */
  protected readonly failed = computed(() => this.results.status() === 'error');

  constructor() {
    const seo = inject(SeoService);
    const { host } = inject(DOCUMENT).location;
    effect(() => {
      const term = this.q();
      seo.set({
        title: `${term} - ${host}`,
        description: `${term} vijesti na portalu ${host}`,
        keywords: term ?? '',
      });
    });
  }

  protected getPage(page: number) {
    goToPage(this.router, page);
  }
}
