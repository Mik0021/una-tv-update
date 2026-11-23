import {
  Component,
  OnInit,
  DOCUMENT,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Home } from 'src/app/interfaces/home.model';
import { environment } from 'src/environments/environment';
import { TvShow } from './../../interfaces/tv-show.model';
import { HomeService } from './../../services/home.service';
import { HomeHeroSectionFullComponent } from '../../sections/home-hero-section-full/home-hero-section-full.component';
import { CategorySectionSmallCardsContentDownComponent } from '../../sections/category-section-small-cards-content-down/category-section-small-cards-content-down.component';
import { CategorySectionPersonalitiesComponent } from '../../sections/category-section-personalities/category-section-personalities.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    HomeHeroSectionFullComponent,
    CategorySectionSmallCardsContentDownComponent,
    CategorySectionPersonalitiesComponent,
  ],
})
export class HomeComponent implements OnInit {
  private homeService = inject(HomeService);
  private metaService = inject(Meta);
  private titleService = inject(Title);
  private _document = inject<Document>(DOCUMENT);

  heroSection = {} as Home;
  heroType: number = 1;
  heroArticleList: TvShow[] = [];
  sectionArticleList: TvShow[] = [];

  home$: Observable<Home> = this.homeService.home$;

  ngOnInit(): void {
    this.homeService.getHomePage();
    this.home$.subscribe((homeData: Home) => {
      this.heroType = homeData.data[0].tv_show_template.type_id;
      this.heroSection = homeData;
      this.heroArticleList = homeData.data[0].tv_shows;
      this.addTags();
    });
  }

  addTags() {
    this.titleService.setTitle(environment.APP_TITLE);
    this.metaService.updateTag({
      name: 'description',
      content: environment.APP_HOME_META_DESCRIPTION,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: environment.APP_HOME_META_KEYWORDS,
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: environment.APP_HOME_META_TITLE,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: environment.APP_HOME_META_DESCRIPTION,
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
      content: environment.APP_HOME_META_TITLE,
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: environment.APP_HOME_META_DESCRIPTION,
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
    });
    this.metaService.addTag({
      name: 'google-site-verification',
      content: environment.APP_GOOGLE_VERIFICATION,
    });
    this._document.head
      .querySelector('[rel=canonical]')
      ?.setAttribute('href', `${this._document.location.href}`);
  }
}
