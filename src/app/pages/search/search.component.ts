import {
  Component,
  OnInit,
  DOCUMENT,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Paginator } from 'src/app/interfaces/paginator.model';
import { Search } from './../../interfaces/search.model';
import { TvShow } from './../../interfaces/tv-show.model';
import { SearchService } from './../../services/search.service';
import { CardSmallContentDownComponent } from '../../components/card-small-content-down/card-small-content-down.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CardSmallContentDownComponent, NgxPaginationModule],
})
export class SearchComponent implements OnInit {
  private searchService = inject(SearchService);
  private router = inject(Router);
  private acitivatedRoute = inject(ActivatedRoute);
  private _document = inject<Document>(DOCUMENT);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  articles: TvShow[] = [];
  searchTerm: string = '';
  paginator = {} as Paginator;
  p: number = 1;

  $search: Observable<Search> = this.searchService.searchRes$;

  constructor() {
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
      `${this.searchTerm} - ${this._document.location.host}`,
    );

    this.metaService.updateTag({
      name: 'description',
      content: `${this.searchTerm} vijesti na portalu ${this._document.location.host}`,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: this.searchTerm,
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: `${this.searchTerm} - ${this._document.location.host}`,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: `${this.searchTerm} vijesti na portalu ${this._document.location.host}`,
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
      content: `${this.searchTerm} - ${this._document.location.host}`,
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: `${this.searchTerm} vijesti na portalu ${this._document.location.host}`,
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
    });

    this._document.head
      .querySelector('[rel=canonical]')
      ?.setAttribute('href', `${this._document.location.href}`);
  }
}
