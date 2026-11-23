import { TvShow } from './../../interfaces/tv-show.model';
import { PersonalityShow } from './../../interfaces/personality-show.model';
import { Image } from 'src/app/interfaces/image.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PersonalitiesService } from './../../services/personalities.service';
import { Component, Inject, OnInit } from '@angular/core';
import { PersonalitySingle } from 'src/app/interfaces/personality-single.model';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-personality-single',
    templateUrl: './personality-single.component.html',
    styleUrls: ['./personality-single.component.scss'],
    standalone: false
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
    private activatedRoute: ActivatedRoute,
    private metaService: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private _document: Document
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
        this.addTags();
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
  addTags() {
    this.titleService.setTitle(this.personality.data.name);

    this.metaService.updateTag({
      name: 'description',
      content: this.personality.data.sub_title,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: this.personality.data.name,
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: this.personality.data.name,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: this.personality.data.sub_title,
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: this.personality.data.image.thumbnails[944]
        ? this.personality.data.image.thumbnails[944]
        : 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
    });
    this.metaService.updateTag({
      property: 'og:image:width',
      content: '944',
    });
    this.metaService.updateTag({
      property: 'og:image:height',
      content: '531',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: `${this._document.location.href}`,
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'article',
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
      content: this.personality.data.name,
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: this.personality.data.sub_title,
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: this.personality.data.image.thumbnails[944]
        ? this.personality.data.image.thumbnails[944]
        : 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
    });
  }
}
