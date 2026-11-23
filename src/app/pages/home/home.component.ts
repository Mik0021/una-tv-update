import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SeoService } from 'src/app/services/seo.service';
import { environment } from 'src/environments/environment';
import { CategorySectionPersonalitiesComponent } from '../../sections/category-section-personalities/category-section-personalities.component';
import { CategorySectionSmallCardsContentDownComponent } from '../../sections/category-section-small-cards-content-down/category-section-small-cards-content-down.component';
import { HomeHeroSectionFullComponent } from '../../sections/home-hero-section-full/home-hero-section-full.component';
import { lastValue } from '../../utils/resource';
import { HomeService } from './../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HomeHeroSectionFullComponent,
    CategorySectionSmallCardsContentDownComponent,
    CategorySectionPersonalitiesComponent,
  ],
})
export class HomeComponent {
  protected readonly home = lastValue(inject(HomeService).home());

  /** The first section is the hero; its template decides how it's shown. */
  protected readonly heroType = computed(
    () => this.home()?.data[0]?.tv_show_template.type_id ?? 1,
  );
  protected readonly heroArticles = computed(
    () => this.home()?.data[0]?.tv_shows ?? [],
  );

  constructor() {
    const seo = inject(SeoService);
    const meta = inject(Meta);
    effect(() => {
      if (!this.home()) {
        return;
      }
      seo.set({
        title: environment.APP_TITLE,
        description: environment.APP_HOME_META_DESCRIPTION,
        keywords: environment.APP_HOME_META_KEYWORDS,
        shareTitle: environment.APP_HOME_META_TITLE,
      });
      meta.updateTag({
        name: 'google-site-verification',
        content: environment.APP_GOOGLE_VERIFICATION,
      });
    });
  }
}
