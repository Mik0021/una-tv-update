import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article.model';
import { Paginator } from 'src/app/interfaces/paginator.model';
import { CategoryList } from './../../interfaces/category-list.model';
import { CategorysService } from './../../services/categorys.service';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, Location } from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  category = {} as CategoryList;
  articles: Article[] = [];
  categoryRoute: string | null = '';
  parentCategoryRoute: string | null = '';
  p: number = 1;
  paginator = {} as Paginator;

  category$: Observable<CategoryList> = this.categoryService.category$;

  constructor(
    private categoryService: CategorysService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private metaService: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private _document: Document
  ) {
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
      this.articles = res.data.articles;
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
    this.titleService.setTitle(this.category.data.category.name);
    this.metaService.updateTag({
      name: 'og:title',
      content: this.category.data.category.seo_title,
    });
    this.metaService.updateTag({
      name: 'og:description',
      content: this.category.data.category.seo_description,
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
      content: this.category.data.category.seo_description,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: this.category.data.category.seo_title,
    });
  }
}
