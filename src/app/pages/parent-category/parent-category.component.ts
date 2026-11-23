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
  selector: 'app-parent-category',
  templateUrl: './parent-category.component.html',
  styleUrls: ['./parent-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardSmallContentDownComponent, NgxPaginationModule],
})
export class ParentCategoryComponent {
  private router = inject(Router);
  private seo = inject(SeoService);

  /** Route param `:category`. */
  readonly category = input<string>();
  /** Query param `p`. */
  readonly p = input(1, { transform: pageParam });

  private readonly resource = inject(CategorysService).parentCategory(
    this.category,
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
