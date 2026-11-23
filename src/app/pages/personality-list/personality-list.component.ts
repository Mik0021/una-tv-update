import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SeoService } from 'src/app/services/seo.service';
import { PersonalityCardComponent } from '../../components/personality-card/personality-card.component';
import { goToPage, pageParam } from '../../utils/paging';
import { lastValue } from '../../utils/resource';
import { PersonalitiesService } from './../../services/personalities.service';

@Component({
  selector: 'app-personality-list',
  templateUrl: './personality-list.component.html',
  styleUrls: ['./personality-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PersonalityCardComponent, NgxPaginationModule],
})
export class PersonalityListComponent {
  private router = inject(Router);

  /** Query param `p`. */
  readonly p = input(1, { transform: pageParam });

  protected readonly data = lastValue(
    inject(PersonalitiesService).personalities(this.p),
  );

  constructor() {
    const seo = inject(SeoService);
    // Re-set on every page of data so og:url/canonical follow `?p=`.
    effect(() => {
      if (this.data()) {
        seo.set({
          title: 'Naša lica',
          description: 'Pogledajte lica na UNA TV',
          keywords: 'una tv, lica, licnosti',
        });
      }
    });
  }

  protected getPage(page: number) {
    goToPage(this.router, page);
  }
}
