
import { Component, OnInit, DOCUMENT, ChangeDetectionStrategy, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Paginator } from 'src/app/interfaces/paginator.model';
import { CategoryList } from './../../interfaces/category-list.model';
import { TvShow } from './../../interfaces/tv-show.model';
import { CategorysService } from './../../services/categorys.service';
import { NgStyle } from '@angular/common';
import { CardSmallContentDownComponent } from '../../components/card-small-content-down/card-small-content-down.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgStyle, CardSmallContentDownComponent, NgxPaginationModule]
})
export class CategoryListComponent implements OnInit {
  private categoryService = inject(CategorysService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private metaService = inject(Meta);
  private titleService = inject(Title);
  private _document = inject<Document>(DOCUMENT);

  category = {} as CategoryList;
  articles: TvShow[] = [];
  categoryRoute: string | null = '';
  parentCategoryRoute: string | null = '';
  p: number = 1;
  paginator = {} as Paginator;

  category$: Observable<CategoryList> = this.categoryService.category$;

  constructor() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['p'] === undefined) {
        this.p = 1;
      } else {
        this.p = params['p'];
      }
    });
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('category')) {
        return;
      }
      this.parentCategoryRoute = paramMap.get('category');
      this.categoryRoute = paramMap.get('subcategory');
      this.updateItemsRemote();
    });
  }

  ngOnInit(): void {
    this.category$.subscribe((res) => {
      this.category = res;
      this.articles = res.data.tv_shows;
      this.paginator = res.paginator;
      this.addTags();
    });
  }

  getPage(page: number) {
    this.p = page;
    if (this.p > 1) {
      this.router.navigate([], {
        queryParams: {
          p: this.p,
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([]);
    }
    this.updateItemsRemote();
    window.scrollTo(0, 0);
  }

  updateItemsRemote() {
    this.categoryService.getCategory(
      this.parentCategoryRoute,
      this.categoryRoute,
      this.p
    );
  }

  addTags() {
    this.titleService.setTitle(this.category.data.tv_category.name);

    this.metaService.updateTag({
      name: 'description',
      content: this.category.data.tv_category.seo_description,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: this.category.data.tv_category.name,
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: this.category.data.tv_category.seo_title,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: this.category.data.tv_category.seo_description,
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
    });
    this.metaService.updateTag({
      property: 'og:image:width',
      content: '1920',
    });
    this.metaService.updateTag({
      property: 'og:image:height',
      content: '1080',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: `${this._document.location.href}`,
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.metaService.updateTag({
      name: 'twitter:site',
      content: '@',
    });
    this.metaService.updateTag({
      name: 'twitter:creator',
      content: `${this._document.location.host}`,
    });
    this.metaService.updateTag({
      name: 'twitter:domain',
      content: `${this._document.location.host}`,
    });
    this.metaService.updateTag({
      name: 'twitter:title',
      content: this.category.data.tv_category.seo_title,
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: this.category.data.tv_category.seo_description,
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
    });

    this._document.head
      .querySelector('[rel=canonical]')
      ?.setAttribute('href', `${this._document.location.href}`);

    this.metaService.updateTag({
      name: 'og:title',
      content: this.category.data.tv_category.seo_title,
    });
    this.metaService.updateTag({
      name: 'og:description',
      content: this.category.data.tv_category.seo_description,
    });
    this.metaService.updateTag({
      name: 'og:url',
      content: `${this._document.location.href}`,
    });
    this.metaService.updateTag({
      name: 'og:type',
      content: 'website',
    });
    this.metaService.updateTag({
      name: 'og:image',
      content: 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
    });
    this.metaService.updateTag({
      name: 'description',
      content: this.category.data.tv_category.seo_description,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: this.category.data.tv_category.seo_title,
    });
  }
}
