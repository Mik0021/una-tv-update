import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  effect,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SeoService } from 'src/app/services/seo.service';
import { CardSmallContentDownComponent } from '../../components/card-small-content-down/card-small-content-down.component';
import { goToPage, pageParam } from '../../utils/paging';
import { lastValue, notFoundOnError } from '../../utils/resource';
import { TagService } from './../../services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardSmallContentDownComponent, NgxPaginationModule],
})
export class TagComponent {
  private router = inject(Router);
  private seo = inject(SeoService);
  private document = inject(DOCUMENT);

  /** Route param `:tag`. */
  readonly tag = input<string>();
  /** Query param `p`. */
  readonly p = input(1, { transform: pageParam });

  private readonly resource = inject(TagService).tag(this.tag, this.p);
  protected readonly data = lastValue(this.resource);

  constructor() {
    notFoundOnError(this.resource);
    effect(() => {
      const tag = this.data()?.data.tv_tag;
      if (tag) {
        this.seo.set({
          title: tag.name,
          description: `Vijesti i članci koji sadrže pojam ${tag.name} na portalu ${this.document.location.host}`,
          keywords: tag.name,
        });
      }
    });
  }

  protected getPage(page: number) {
    goToPage(this.router, page);
  }
}
