import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Personality } from 'src/app/interfaces/personality.model';

@Component({
  selector: 'app-personality-card',
  templateUrl: './personality-card.component.html',
  styleUrls: ['./personality-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class PersonalityCardComponent {
  readonly articleData = input.required<Personality>();

  protected readonly srcSet = computed(() => {
    const thumbs = this.articleData()?.image?.thumbnails;
    return thumbs?.[710] && thumbs?.[944]
      ? `${thumbs[710]} 175w, ${thumbs[944]}`
      : '';
  });
}
