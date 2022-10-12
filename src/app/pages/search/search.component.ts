import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Paginator } from 'src/app/interfaces/paginator.model';
import { Search } from './../../interfaces/search.model';
import { TvShow } from './../../interfaces/tv-show.model';
import { SearchService } from './../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  articles: TvShow[] = [];
  searchTerm: string = '';
  paginator = {} as Paginator;
  p: number = 1;

  $search: Observable<Search> = this.searchService.searchRes$;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private acitivatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private _document: Document,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.acitivatedRoute.queryParams.subscribe((params) => {
      if (params['p'] === undefined) {
        this.p = 1;
      } else {
        this.p = params['p'];
      }
      this.searchTerm = params['q'];
      this.updateItems(this.searchTerm, this.p);
    });
  }

  ngOnInit(): void {
    this.$search.subscribe((res: Search) => {
      this.articles = res.data;
      this.paginator = res.paginator;
    });
    this.addTags();
  }

  updateItems(search: string, page: number) {
    this.searchService.search(search, page);
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
      this.updateItems(this.searchTerm, this.p);
    } else {
      this.router.navigate([]);
    }

    window.scrollTo(0, 0);
  }

  addTags() {
    this.titleService.setTitle(
      `${this.searchTerm} - ${this._document.location.host}`
    );
    this.metaService.updateTag({
      name: 'og:title',
      content: `${this.searchTerm} - ${this._document.location.host}`,
    });
    this.metaService.updateTag({
      name: 'og:description',
      content: `${this.searchTerm} vijesti na portalu ${this._document.location.host}`,
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
      content: `${this.searchTerm} vijesti na portalu ${this._document.location.host}`,
    });

    this.metaService.updateTag({
      name: 'keywords',
      content: this.searchTerm,
    });
  }
}
