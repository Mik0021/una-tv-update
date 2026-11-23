import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategorysService } from 'src/app/services/categorys.service';
import { SeoService } from 'src/app/services/seo.service';
import { CardSmallContentDownComponent } from '../../components/card-small-content-down/card-small-content-down.component';
import { goToPage, pageParam } from '../../utils/paging';
import { lastValue, notFoundOnError } from '../../utils/resource';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, CardSmallContentDownComponent, NgxPaginationModule],
})
export class CategoryListComponent {
  private router = inject(Router);
  private seo = inject(SeoService);

  /** Route params `:category/:subcategory`. */
  readonly category = input<string>();
  readonly subcategory = input<string>();
  /** Query param `p`. */
  readonly p = input(1, { transform: pageParam });

  private readonly resource = inject(CategorysService).category(
    this.category,
    this.subcategory,
    this.p,
  );
  protected readonly data = lastValue(this.resource);

  constructor() {
    notFoundOnError(this.resource);
    effect(() => {
      const tvCategory = this.data()?.data.tv_category;
      if (tvCategory) {
        this.seo.set({
          title: tvCategory.name,
          description: tvCategory.seo_description,
          keywords: tvCategory.seo_title,
          shareTitle: tvCategory.seo_title,
        });
      }
    });
  }

  protected getPage(page: number) {
    goToPage(this.router, page);
  }
}
