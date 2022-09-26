import { Observable } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article.model';
import { Author } from 'src/app/interfaces/author.model';
import { AuthorService } from 'src/app/services/author.service';
import { Authors } from './../../interfaces/authors.model';
import { Paginator } from './../../interfaces/paginator.model';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, Location } from '@angular/common';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  author = {} as Authors;
  articles: Article[] = [];
  authorRoute: string | null = '';
  p: number = 1;
  paginator = {} as Paginator;

  author$: Observable<Author> = this.authorService.author$;

  constructor(
    private authorService: AuthorService,
    private activatedRoute: ActivatedRoute,
    private metaService: Meta,
    private titleService: Title,
    private router: Router,
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
      if (!paramMap.has('author')) {
        return;
      }
      this.authorRoute = paramMap.get('author');
      this.updateItemsRemote();
    });
  }

  ngOnInit(): void {
    this.author$.subscribe((res) => {
      this.author = res.data.author;
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
    this.authorService.getAuthor(this.authorRoute, this.p);
  }

  addTags() {
    this.titleService.setTitle(
      `${this.author.first_name} ${this.author.last_name}`
    );
    this.metaService.updateTag({
      name: 'og:title',
      content: `${this.author.first_name} ${this.author.last_name}`,
    });
    this.metaService.updateTag({
      name: 'og:description',
      content: `${this.author.first_name} ${this.author.last_name}`,
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
      content: `${this.author.first_name} ${this.author.last_name}`,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: `${this.author.first_name} ${this.author.last_name}`,
    });
  }
}
