import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/interfaces/tag.model';
import { Tags } from 'src/app/interfaces/tags.model';
import { Paginator } from './../../interfaces/paginator.model';
import { TvShow } from './../../interfaces/tv-show.model';
import { TagService } from './../../services/tag.service';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
    standalone: false
})
export class TagComponent implements OnInit {
  tag = {} as Tags;
  articles: TvShow[] = [];
  tagRoute: string | null = '';
  p: number = 1;
  paginator = {} as Paginator;

  tag$: Observable<Tag> = this.tagService.tag$;

  constructor(
    private tagService: TagService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
      if (!paramMap.has('tag')) {
        return;
      }
      this.tagRoute = paramMap.get('tag');
      this.updateItemsRemote();
    });
  }

  ngOnInit(): void {
    this.tag$.subscribe((res: Tag) => {
      this.tag = res.data.tv_tag;
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
    this.tagService.getTag(this.tagRoute, this.p);
  }

  addTags() {
    this.titleService.setTitle(this.tag.name);
    this.metaService.updateTag({
      name: 'og:title',
      content: this.tag.name,
    });
    this.metaService.updateTag({
      name: 'og:description',
      content: `Vijesti i članci koji sadrže pojam ${this.tag.name} na portalu ${this._document.location.host}`,
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
      content: `Vijesti i članci koji sadrže pojam ${this.tag.name} na portalu ${this._document.location.host}`,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: this.tag.name,
    });
  }
}
