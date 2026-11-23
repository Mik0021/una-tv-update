import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Personality } from 'src/app/interfaces/personality.model';

@Component({
  selector: 'app-personality-home-card',
  templateUrl: './personality-home-card.component.html',
  styleUrls: ['./personality-home-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class PersonalityHomeCardComponent {
  readonly articleData = input.required<Personality>();

  protected readonly srcSet = computed(() => {
    const thumbs = this.articleData()?.image?.thumbnails;
    return thumbs?.[144] && thumbs?.[345]
      ? `${thumbs[144]} 175w, ${thumbs[345]}`
      : '';
  });
}
