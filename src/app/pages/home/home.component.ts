import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Home } from 'src/app/interfaces/home.model';
import { environment } from 'src/environments/environment';
import { Article } from './../../interfaces/article.model';
import { TvShow } from './../../interfaces/tv-show.model';
import { HomeService } from './../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  heroSection = {} as Home;
  heroType: number = 1;
  heroArticleList: TvShow[] = [];
  sectionArticleList: TvShow[] = [];

  home$: Observable<Home> = this.homeService.home$;

  constructor(
    private homeService: HomeService,
    private metaService: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit(): void {
    this.homeService.getHomePage();
    this.home$.subscribe((homeData: Home) => {
      this.heroType = homeData.data[0].tv_show_template.id;
      this.heroSection = homeData;
      this.heroArticleList = homeData.data[0].tv_shows;
      this.addTags();
    });
  }

  addTags() {
    this.titleService.setTitle(environment.APP_TITLE);
    this.metaService.updateTag({
      name: 'og:title',
      content: environment.APP_HOME_META_TITLE,
    });
    this.metaService.updateTag({
      name: 'og:description',
      content: environment.APP_HOME_META_DESCRIPTION,
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
      content: environment.APP_HOME_META_DESCRIPTION,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: environment.APP_HOME_META_KEYWORDS,
    });
  }
}
