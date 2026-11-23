import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { CardSmallContentDownComponent } from '../../components/card-small-content-down/card-small-content-down.component';
import { HtmlEmbedComponent } from '../../components/html-embed/html-embed.component';
import { lastValue, notFoundOnError } from '../../utils/resource';
import { PersonalitiesService } from './../../services/personalities.service';

@Component({
  selector: 'app-personality-single',
  templateUrl: './personality-single.component.html',
  styleUrls: ['./personality-single.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HtmlEmbedComponent, CardSmallContentDownComponent],
})
export class PersonalitySingleComponent {
  /** Route param `:personality`. */
  readonly personality = input<string>();

  private readonly personalities = inject(PersonalitiesService);
  private readonly resource = this.personalities.personality(this.personality);
  protected readonly data = lastValue(this.resource);
  private readonly showsData = lastValue(
    this.personalities.personalityShows(this.personality),
  );
  protected readonly shows = computed(
    () => this.showsData()?.data.tv_shows ?? [],
  );

  constructor() {
    notFoundOnError(this.resource);
    const seo = inject(SeoService);
    effect(() => {
      const personality = this.data()?.data;
      if (personality) {
        seo.set({
          title: personality.name,
          description: personality.sub_title,
          keywords: personality.name,
          image: personality.image?.thumbnails?.[944] || undefined,
          imageWidth: '944',
          imageHeight: '531',
          type: 'article',
        });
      }
    });
  }
}
