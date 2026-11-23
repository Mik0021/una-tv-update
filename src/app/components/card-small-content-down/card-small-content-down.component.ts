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
  selector: 'app-card-small-content-down',
  templateUrl: './card-small-content-down.component.html',
  styleUrls: ['./card-small-content-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class CardSmallContentDownComponent {
  readonly articleData = input.required<TvShow>();

  protected readonly articleSlug = computed(() =>
    tvShowPath(this.articleData()),
  );

  protected readonly srcSet = computed(() => {
    const thumbs = this.articleData()?.image?.thumbnails;
    return thumbs?.[144] && thumbs?.[345]
      ? `${thumbs[144]} 175w, ${thumbs[345]}`
      : '';
  });
}
