import { TvShow } from './../../interfaces/tv-show.model';
import { PersonalityShow } from './../../interfaces/personality-show.model';
import { Image } from 'src/app/interfaces/image.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PersonalitiesService } from './../../services/personalities.service';
import { Component, OnInit } from '@angular/core';
import { PersonalitySingle } from 'src/app/interfaces/personality-single.model';

@Component({
  selector: 'app-personality-single',
  templateUrl: './personality-single.component.html',
  styleUrls: ['./personality-single.component.scss'],
})
export class PersonalitySingleComponent implements OnInit {
  image = {} as Image;
  srcSet: string = '';
  content: any;
  personalitySlug: string | null = '';
  personality = {} as PersonalitySingle;
  personalityShows = [] as TvShow[];

  personalitySingle$: Observable<PersonalitySingle> =
    this.personalitiesService.personalitySingle$;

  personalityShows$: Observable<PersonalityShow> =
    this.personalitiesService.personalityShows$;

  constructor(
    private personalitiesService: PersonalitiesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('personality')) {
        return;
      } else {
        this.personalitySlug = paramMap.get('personality');
        this.personalitiesService.getPersonality(this.personalitySlug);
        this.personalitiesService.getPersonalityShows(this.personalitySlug);
      }
    });
  }

  ngOnInit(): void {
    this.personalitySingle$.subscribe({
      next: (res: PersonalitySingle) => {
        this.personality = res;
        this.image = res.data.image;
        this.content = res.data.description;
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
    this.personalityShows$.subscribe({
      next: (res: PersonalityShow) => {
        this.personalityShows = res.data.tv_shows;
      },
    });
  }

  createSrcSet() {
    if (
      this.image &&
      this.image.thumbnails &&
      this.image.thumbnails[710] &&
      this.image.thumbnails[944]
    ) {
      this.srcSet = `${this.image.thumbnails[710]} 490w, ${this.image.thumbnails[944]}`;
    }
  }
}
