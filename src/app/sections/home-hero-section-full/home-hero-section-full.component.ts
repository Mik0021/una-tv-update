import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { tvShowPath } from '../../utils/paths';
import { TvShow } from './../../interfaces/tv-show.model';

@Component({
  selector: 'app-home-hero-section-full',
  templateUrl: './home-hero-section-full.component.html',
  styleUrls: ['./home-hero-section-full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class HomeHeroSectionFullComponent {
  readonly articles = input<TvShow[]>([]);

  /** Only the first show is displayed. */
  protected readonly hero = computed(() => this.articles()[0]);

  protected readonly articleSlug = computed(() => tvShowPath(this.hero()));

  protected readonly srcSet = computed(() => {
    const image = this.hero()?.image;
    const thumbs = image?.thumbnails;
    return thumbs?.[345] && thumbs?.[710]
      ? `${thumbs[345]} 345w, ${thumbs[710]} 710w, ${thumbs[944]} 944w, ${image.url}  `
      : '';
  });
}
